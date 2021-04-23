import * as shell from "shelljs";

shell.cp('-R', "asset/", "pitchbuild/");
shell.cp('-R', "_locales/", "pitchbuild/");