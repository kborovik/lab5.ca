.EXPORT_ALL_VARIABLES:
.ONESHELL:
.SILENT:

SHELL := /bin/bash
.SHELLFLAGS := -euo pipefail -c
MAKEFLAGS += --no-builtin-rules --no-builtin-variables
root_dir := $(shell git rev-parse --show-toplevel)

.DEFAULT_GOAL := help
.PHONY: help install dev preview build clean clean-all check playwright wrangler status deploy

###############################################################################
# Help (default target)
###############################################################################

help: ## Show this help — list all targets with descriptions
	printf "$(blue)Usage:$(reset) $(green)make [target]$(reset)\n$(blue)Targets:$(reset)\n"
	awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z0-9_-]+:.*?## / { printf "  $(yellow)%-12s$(reset) %s\n", $$1, $$2 | "sort" }' $(MAKEFILE_LIST)

###############################################################################
# Dependencies
###############################################################################

install: ## Install pnpm (via Homebrew if missing), then pnpm install
	$(call header,Installing dependencies)
	cd $(root_dir)
	command -v pnpm >/dev/null 2>&1 || brew install pnpm
	pnpm install

###############################################################################
# Development
###############################################################################

dev: clean ## Start the local dev server (astro dev, http://localhost:4321)
	$(call header,Starting dev server)
	cd $(root_dir)
	pnpm astro dev

preview: build ## Build and preview the production output locally
	$(call header,Previewing production build)
	cd $(root_dir)
	pnpm astro preview

###############################################################################
# Build
###############################################################################

build: clean check ## Clean, type-check, and build the site to dist/
	$(call header,Building site)
	cd $(root_dir)
	pnpm astro build

clean: ## Remove build artifacts (dist/, .astro/)
	$(call header,Cleaning build artifacts)
	cd $(root_dir)
	rm -rf dist/ .astro/

clean-all: clean ## Remove build artifacts and node_modules
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

playwright: ## Install Playwright Chrome browser binary (pnpm dlx)
	$(call header,Installing Playwright Chrome)
	pnpm dlx playwright install

###############################################################################
# Deploy
###############################################################################

wrangler: ## Install Wrangler CLI globally
	$(call header,Installing Wrangler)
	pnpm add -g wrangler

status: ## Check Cloudflare Workers deployment status (JSON)
	$(call header,Checking deployment status)
	wrangler deployments status --name=lab5-ca --json

deploy: build ## Build and deploy to Cloudflare Workers
	$(call header,Deploying to Cloudflare Workers)
	cd $(root_dir)
	wrangler deploy

###############################################################################
# Internal — tty-aware colors and the header helper
#   Colors are emitted only when stdout is an interactive terminal, so escape
#   codes never leak into piped output (CI logs, LLM-agent transcripts, etc.).
###############################################################################

ifeq ($(shell test -t 1 && echo tty),tty)
  blue   := $(shell tput setaf 4)
  green  := $(shell tput setaf 2)
  yellow := $(shell tput setaf 3)
  reset  := $(shell tput sgr0)
else
  blue   :=
  green  :=
  yellow :=
  reset  :=
endif

define header
echo "$(blue)==> $(1) <==$(reset)"
endef
