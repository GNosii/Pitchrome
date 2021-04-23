import * as shell from "shelljs";

shell.cp('-u', "popup/*html", "pitchbuild/popup");
shell.cp('-u', "options/*html", "pitchbuild/options");