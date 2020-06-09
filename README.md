krane-cli
=========

CLI for krane-server

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/krane-cli.svg)](https://npmjs.org/package/krane-cli)
[![Downloads/week](https://img.shields.io/npm/dw/krane-cli.svg)](https://npmjs.org/package/krane-cli)
[![License](https://img.shields.io/npm/l/krane-cli.svg)](https://github.com/biensupernice/krane-cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g krane-cli
$ krane-cli COMMAND
running command...
$ krane-cli (-v|--version|version)
krane-cli/0.0.0 darwin-x64 node-v13.8.0
$ krane-cli --help [COMMAND]
USAGE
  $ krane-cli COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`krane-cli deploy [TAG]`](#krane-cli-deploy-tag)
* [`krane-cli help [COMMAND]`](#krane-cli-help-command)
* [`krane-cli login [ENDPOINT]`](#krane-cli-login-endpoint)
* [`krane-cli ls [FILE]`](#krane-cli-ls-file)

## `krane-cli deploy [TAG]`

Deploy this app

```
USAGE
  $ krane-cli deploy [TAG]

ARGUMENTS
  TAG  [default: latest] image tag to deploy
```

_See code: [src/commands/deploy.ts](https://github.com/biensupernice/krane-cli/blob/v0.0.0/src/commands/deploy.ts)_

## `krane-cli help [COMMAND]`

display help for krane-cli

```
USAGE
  $ krane-cli help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.3/src/commands/help.ts)_

## `krane-cli login [ENDPOINT]`

Login to a krane server

```
USAGE
  $ krane-cli login [ENDPOINT]
```

_See code: [src/commands/login.ts](https://github.com/biensupernice/krane-cli/blob/v0.0.0/src/commands/login.ts)_

## `krane-cli ls [FILE]`

describe the command here

```
USAGE
  $ krane-cli ls [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/ls.ts](https://github.com/biensupernice/krane-cli/blob/v0.0.0/src/commands/ls.ts)_
<!-- commandsstop -->
