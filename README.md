# Copy filepath with line numbers for Atom

This is a small package that can copy the current file path(relative) and line number(s) to clipboard for later use.

It supports single line, multiple lines, multiple selections.

For example, when
* your cursor is on a single line,
* or when you have multiple cursors at the same time,
* or when you have selected multiple blocks of code at the same time,   

When you trigger this package, the file path and all line numbers will be copied to clipboard in one of the following format.

* `app/controllers/index.js:89`
* `app/controllers/index.js:89, 100, 130`
* `app/controllers/index.js:89~100, 209~230`
* `app/controllers/index.js:45, 89~100, 132, 209~230`

# Several ways to trigger this package
1. Right click anywhere on the code, then select `Copy filepath with line numbers (relative path)`
2. Press default shortcut key: `ctrl-l`. If you want to use your custom shortcut, bind your shortcut to this command `copy-filepath-with-line-numbers:relative` under `atom-workspace`
3. Open command palette`cmd-shift-p`(MacOS) or `ctrl-shift-p`(Windows, Linux), then type `pathline` or similiar
4. Click `Package` on top Menubar, then choose `Copy Filepath with Line Numbers`
