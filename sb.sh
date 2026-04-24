#!/usr/bin/env bash
set -euo pipefail

# Resolve script path even when invoked via symlink (e.g. /usr/local/bin/sb).
SOURCE="${BASH_SOURCE[0]}"
while [[ -h "$SOURCE" ]]; do
  SCRIPT_DIR="$(cd -P "$(dirname "$SOURCE")" >/dev/null 2>&1 && pwd)"
  SOURCE="$(readlink "$SOURCE")"
  [[ "$SOURCE" != /* ]] && SOURCE="$SCRIPT_DIR/$SOURCE"
done
SCRIPT_DIR="$(cd -P "$(dirname "$SOURCE")" >/dev/null 2>&1 && pwd)"

PROJECT_ROOT="$SCRIPT_DIR"
STORYBOOK_DIR="$PROJECT_ROOT/storybook"

if [[ ! -d "$STORYBOOK_DIR" ]]; then
  echo "storybook directory not found: $STORYBOOK_DIR"
  exit 1
fi

cd "$STORYBOOK_DIR"

if [[ "${1:-}" == "dev" ]]; then
  npm run storybook
  exit 0
fi

npm run build-storybook
echo "Build complete: $STORYBOOK_DIR/storybook-static"
echo "Tip: run 'sb dev' to start local Storybook server."
