#!/bin/sh

# windowns :PowerShell标记“&&”不是此版本中的有效语句分隔符, 将“&&” 改成逗号
# Windows 用户，编辑的脚本会报错，需要添加以下脚本
command_exists () {
  command -v "$1" >/dev/null 2>&1
}

# Workaround for Windows 10, Git Bash and Yarn
if command_exists winpty && test -t 1; then
  exec < /dev/tty
fi
