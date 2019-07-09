## Make single file executable (without dependencies)

```
pyinstaller --onefile <python-file>.py  
```
or
```
nuitka --follow-imports <python-file>.py
```
Nuitka is a Python to C compiler. It transforms your Python code into C code then compiles it into a binary.
Executables from pyinstaller seems to be bigger and slower so use nuitka if possible.