const fs = require("fs").promises;
const path = require("path");

const base = path.join(__dirname, "START");
const dist = path.join(__dirname, "result");

const createFolder = async (src) => {
  try {
    await fs.mkdir(src);
  } catch (err) {
    if (err.code !== "EEXIST") {
      console.log(err);
      return;
    }
  }
};

const moveFilesUp = async (base) => {
  try {
    const folders = await fs.readdir(base);

    folders.forEach(async (item) => {
      const localBase = path.join(base, item);
      const state = await fs.stat(localBase);

      if (state.isFile()) {
        const basename = path.basename(localBase);
        const firstSymb = basename[0].toUpperCase();
        await createFolder(path.join(dist, firstSymb));
        await fs.link(localBase, path.join(dist, firstSymb, basename));
      } else {
        await moveFilesUp(localBase);
      }
    });
  } catch (err) {
    console.error(err);
  }
};

const main = async () => {
  try {
    await createFolder(dist);
    await moveFilesUp(base);
  } catch (err) {
    console.error(err);
  }
};

main();
