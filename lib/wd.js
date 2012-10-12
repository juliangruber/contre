var stack = [];

function push(dir) {
  stack.push(process.cwd());
  process.chdir(dir);
}

function pop() {
  process.chdir(stack.pop());
}

module.exports = {
  push : push,
  pop : pop
}
