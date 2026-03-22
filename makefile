.EXPORT_ALL_VARIABLES:
.ONESHELL:
.SILENT:

SHELL := /bin/bash
.SHELLFLAGS := -euo pipefail -c
MAKEFLAGS += --no-builtin-rules --no-builtin-variables
root_dir := $(shell git rev-parse --show-toplevel)

###############################################################################
# Dependencies
###############################################################################

install: ## Install dependencies (installs pnpm via Homebrew if missing)
	$(call header,Installing dependencies)
	cd $(root_dir)
	command -v pnpm >/dev/null 2>&1 || brew install pnpm
	pnpm install

###############################################################################
# Development
###############################################################################

dev: clean ## Start the local dev server
	$(call header,Starting dev server)
	cd $(root_dir)
	pnpm astro dev

preview: build ## Preview the production build locally
	$(call header,Previewing production build)
	cd $(root_dir)
	pnpm astro preview

###############################################################################
# Build
###############################################################################

build: clean check ## Build the site for production
	$(call header,Building site)
	cd $(root_dir)
	pnpm astro build

clean: ## Remove build artifacts and caches
	$(call header,Cleaning build artifacts)
	cd $(root_dir)
	rm -rf dist/ .astro/

clean-all: clean ## Remove build artifacts, caches, and node_modules
	$(call header,Removing node_modules)
	cd $(root_dir)
	rm -rf node_modules/

###############################################################################
# Quality
###############################################################################

check: ## Run Astro type checking
	$(call header,Running type check)
	cd $(root_dir)
	pnpm astro check

###############################################################################
# Playwright
###############################################################################

playwright: ## Install Playwright Chrome browser binary
	$(call header,Installing Playwright Chrome)
	pnpm dlx playwright install

###############################################################################
# Deploy
###############################################################################

wrangler: ## Install Wrangler CLI
	$(call header,Installing Wrangler)
	pnpm add -g wrangler

status: ## Check Cloudflare Workers deployment status
	$(call header,Checking deployment status)
	wrangler deployments status --name=lab5-ca --json

deploy: build ## Deploy to Cloudflare Workers
	$(call header,Deploying to Cloudflare Workers)
	cd $(root_dir)
	wrangler deploy

###############################################################################
# Colors and Headers
###############################################################################

TERM := xterm-256color

black := $$(tput setaf 0)
red := $$(tput setaf 1)
green := $$(tput setaf 2)
yellow := $$(tput setaf 3)
blue := $$(tput setaf 4)
magenta := $$(tput setaf 5)
cyan := $$(tput setaf 6)
white := $$(tput setaf 7)
reset := $$(tput sgr0)

define header
echo "$(blue)==> $(1) <==$(reset)"
endef

define var
echo "$(magenta)$(1)$(white): $(yellow)$(2)$(reset)"
endef

help:
	echo "$(blue)Usage: $(green)make [recipe]$(reset)"
	echo "$(blue)Recipes:$(reset)"
	awk 'BEGIN {FS = ":.*?## "; sort_cmd = "sort"} /^[a-zA-Z0-9_-]+:.*?## / \
	{ printf "  \033[33m%-10s\033[0m %s\n", $$1, $$2 | sort_cmd; } \
	END {close(sort_cmd)}' $(MAKEFILE_LIST)

prompt:
	printf "$(magenta)Continue $(white)? $(cyan)(yes/no)$(reset)"
	read -p ": " answer && [ "$$answer" = "yes" ] || exit 127
