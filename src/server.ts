import express from "express";
import { IncomingForm, File } from "formidable";
import * as fs from "fs";

const app = express();

app.use(express.static(`${process.cwd()}/static`));

app.post("/", (req, res) => {
  const form = new IncomingForm();
  console.log(req.body);
  form.parse(req, function (err, fields, files) {
    const file = (files.static as File[])[0];

    const oldpath = file.filepath;
    const newpath = `${process.cwd()}/static/${file.originalFilename}`;

    fs.rename(oldpath, newpath, function (err) {
      // <<======= ONLY oldpath DO NOT ADD __dir
      if (err) throw err;
      res.status(204).send();
    });
  });
});

app.get("/", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write('<form action="" method="post" enctype="multipart/form-data">');
  res.write('<input type="file" name="static"><br>');
  res.write('<input type="submit">');
  res.write("</form>");
  return res.end();
});

app.listen(2020, () => {
  console.log("Running");
});
