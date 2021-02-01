const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const babel = require('@babel/core');


function createGraph(filepath) {
    if (!path.isAbsolute) {
        filepath = path.resolve(__dirname, filepath);
    }
    const content = fs.readFileSync(filepath, 'utf-8');

    const ast = parser.parse(content, {
        sourceType: 'module'
    });

    const deps = [];

    //遍历AST树
    traverse(ast, {
        ImportDeclaration({ node }) {
            const dirname = path.dirname(filepath);
            const sourceVal = node.source.value;
            if (sourceVal[0] === '.' || sourceVal[0] === '/') {
                node.source.value = path.resolve(dirname, sourceVal);
                deps.push(createGraph(node.source.value))
            }
        }
    });

    const {code} = babel.transformFromAst(ast, null, {
        presets: ['@babel/preset-env']
    });

    return {
        filepath,
        deps,
        code
    }
}

function graphToModule(graph, modules = []) {
    modules.push({ id: graph.filepath, code: graph.code });
    if (graph.deps.length) {
        graph.deps.forEach(o => {
            graphToModule(o, modules)
        })
    }
    return modules
}


function createBundle(modules) {
    let modulesTemplateObject = modules.map(module =>
        (`"${module.id}":${generateModuleTemplate(module.code)}`)
    );
    // console.log(modulesTemplateObject);
    return `
    (function (modules) {
        function require(moduleId) {
            const module = { exports : {} };
            modules[moduleId](require, module, module.exports);
            return module.exports;
        }
        require("${modules[0].id}")
    })({${modulesTemplateObject}})`
}

function generateModuleTemplate(code) {
    // 把每个 JS 文件中的代码块包在一个 function 里
    // 将外部的 exports 和 require 传入 function 内
    return `
        function (require, module, exports) {
            ${code}
        }
    `
}

function generateFile (str) {
    fs.writeFileSync("./bundle.js", str);
}


let filepath = './example/entry.js';
let graph = createGraph(filepath);

const modules = graphToModule(graph);

const bundle = createBundle(modules);

generateFile(bundle);
