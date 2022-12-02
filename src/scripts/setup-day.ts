import * as fs from "fs";
import * as path from "path";
import * as http from "https";

(async () => {
  const day = process.argv[2];

  if (!day) {
    console.log("No day specified. Exiting...");
    process.exit(1);
  }

  const dayFolder = path.join(__dirname, `../days/${day}`);
  const inputFolder = `${dayFolder}/input`;
  const templateFolder = path.join(__dirname, "/template");

  console.log(`Setting up day in ${dayFolder}`);

  if (fs.existsSync(dayFolder)) {
    console.log(`Folder for day ${day} already exists. Exiting...`);
    process.exit(1);
  }

  console.log(
    `Creating folder structure and copying templates for ${dayFolder}...`
  );
  fs.mkdirSync(dayFolder, 0o0744);
  fs.mkdirSync(inputFolder, 0o0744);

  fs.closeSync(fs.openSync(`${inputFolder}/sample-input.txt`, "w"));

  var file = fs.readFileSync(
    `${templateFolder}/index.test.ts.template`,
    "utf8"
  );
  console.log(file);
  var result = file.replace(/__DAY__/g, day);
  fs.writeFileSync(`${dayFolder}/index.test.ts`, result);

  fs.copyFileSync(
    `${templateFolder}/index.ts.template`,
    `${dayFolder}/index.ts`
  );

  console.log("Day structure created.");
})();
