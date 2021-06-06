const { src, dest } = require("gulp");


function copyTemplates() {
  return src('./src/app/express/views/**')
    .pipe(dest('./dist/app/express/views'));
};

function copyCss() {
  return src('./src/app/express/public/css/**')
    .pipe(dest('./dist/app/express/public/css'));
};

function copyAssets() {
  return src('./src/app/express/public/assets/**')
    .pipe(dest('./dist/app/express/public/assets'));
};

exports.copyTemplates = copyTemplates;
exports.copyAssets = copyAssets;
exports.copyCss = copyCss;
