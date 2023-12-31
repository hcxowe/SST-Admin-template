module.exports = {
    'env': {
        'browser': true,
        'es2021': true,
        'vue/setup-compiler-macros': true
    },
    'parser': 'vue-eslint-parser',
    'extends': [
        'eslint:recommended',
        'plugin:vue/vue3-essential',
        'plugin:@typescript-eslint/recommended',
        './.eslintrc-auto-import.json'
    ],
    'parserOptions': {
        'ecmaVersion': 'latest',
        'parser': '@typescript-eslint/parser',
        'sourceType': 'module'
    },
    'plugins': [
        'vue',
        '@typescript-eslint'
    ],
    'rules': {
        /* Possible Errors */
        'no-await-in-loop': 'error',                // 禁止在循环中 出现 await
        //'no-console': 'error',                      // 禁用 console
        'no-template-curly-in-string': 'error',     // 禁止在常规字符串中出现模板字面量占位符语法

        /* Best Practices */
        'curly': 'error',                           // 强制所有控制语句使用一致的括号风格 ☻
        'default-case': 'error', 					// switch 必须有 default 分支
        'eqeqeq': ['error', 'always'],	    		// 强制使用 === !== ☻
        'no-alert': 'error',                        // 禁用 alert confirm 和 prompt
        'no-caller': 'error',                       // 禁用 arguments.caller 或 arguments.callee
        'no-else-return': [                         // // 禁止 if 语句中 return 语句之后有 else 块 ☻
            'error',
            { 'allowElseIf': false }
        ],
        'no-empty-function': 'error',               // 禁止出现空函数
        'no-eval': 'error',                         // 禁用 eval()
        'no-implied-eval': 'error',                 // 禁止使用类似 eval() 的方法
        'no-labels': 'error',                       // 禁用标签语句
        'no-magic-numbers': 'warn',                 // 禁用魔术数字
        'no-unmodified-loop-condition': 'error',	// 禁用一成不变的循环条件，防止死循环
        'no-useless-return': 'error',               // 禁止多余的 return 语句 ☻
        'require-await': 'error',					// 禁止不带 await 的 async
        'dot-notation': 'error',                    // 尽量使用点号访问对象属性
        'no-case-declarations': 'error',            // 禁止在 case 或 default 子句中出现词法声明
        'no-multi-spaces': [                        // 禁止出现多个空格, 注释前的空格除外
            'error',
            { 'ignoreEOLComments': true }
        ],
        'no-multi-str': 'error',                    // 禁止多行字符串
        'no-new-func': 'error',                     // 禁用 Function 构造函数
        'no-return-assign': 'error',                // 禁止在返回语句中赋值
        'no-useless-concat': 'error',               // 禁止没必要的字面量拼接

        /* Variables */
        'no-use-before-define': [                   // 禁止在变量申明之前使用
            'error',
            {
                'functions': true,
                'classes': true,
                'variables': true
            }
        ],

        /* Stylistic Issues */
        'func-call-spacing': ['warn', 'never'],     // 禁止在函数标识符和其调用之间有空格 如：fun ()
        'key-spacing': 'error',						// 强制对象属性 : 后需要一个空格
        'indent': [
            'error',
            4,									    // 缩进4个空格
            { 'SwitchCase': 1 }
        ],
        'quotes': [
            'error',
            'single'								// 单引号
        ],
        'jsx-quotes': ['error', 'prefer-double'],   // jsx 所有不包含双引号的 JSX 属性值使用双引号
        'semi': [
            'error',
            'never'
        ],
        'vue/multi-word-component-names': 0,		// 组件名称不强制多单词模式
        'block-spacing': 'error',					// 花括号前后有一个空格，对象除外
        'brace-style': [							// if else 的 { 跟 if 同行， } 要换行，或者 { } 在同一行
            'error',
            '1tbs',
            { 'allowSingleLine': true }
        ],
        'comma-spacing': 'error',					// 逗号前不能有空格，逗号后需要一个空格
        'comma-style': 'error',						// 逗号放在数组元素，对象属性值之后，且在同一行
        'computed-property-spacing': 'error',		// obj[ 'a' ] 不允许出现空格
        'new-cap': 'warn',							// 构造函数首字母大写
        'no-multiple-empty-lines': [                // 限制最多出现两个空行
            'error',
            { 'max': 2 }
        ],
        'no-trailing-spaces': 'error', 				// 禁用行尾空格☻
        'no-unneeded-ternary': 'error', 			// 禁止多余的三元表达式，如a === 1 ? true : false应缩写为 a === 1
        'no-whitespace-before-property': 'error', 	// 禁止属性前有空白，如console. log(obj['a'])，log前面的空白有问题
        'nonblock-statement-body-position': 'error', // 强制单行语句不换行
        'object-curly-newline': [					// 对象数属性要有一致的换行，都换行或都不换行
            'error',
            { 'consistent': true }
        ],
        'object-curly-spacing': [					// 强制对象/解构赋值/import等花括号前后有空格
            'error',
            'always'
        ],
        'operator-assignment': 'error', 			// 尽可能的简化赋值操作，如 x=x+1 应简化为 x+=1
        'semi-spacing': 'error', 					// 强制分号后面有空格，如for (let i=0; i<20; i++)
        'space-before-blocks': 'error', 			// 强制块（for循环/if/函数等）前面有一个空格，如 for (...) {}
        'space-infix-ops': 'error', 				// 强制操作符（ + - / * ）前后有一个空格
        'spaced-comment': [                         // 强制注释（//或/*）后面要有一个空格
            'error',
            'always',
            { 'markers': ['/'] }
        ],
        'template-curly-spacing': [                 // 字符串模板 ${ foo } 花括号加空格
            'warn',
            'always'
        ],
        'space-before-function-paren': [            // 函数左括号之前不要空格
            'warn',
            'never'
        ],
        'padding-line-between-statements': [        // 空行
            'error',
            { 'blankLine': 'always', 'prev': '*', 'next': 'for' },
            { 'blankLine': 'always', 'prev': '*', 'next': 'function' },
            { 'blankLine': 'always', 'prev': '*', 'next': 'if' },
            { 'blankLine': 'always', 'prev': '*', 'next': 'return' },
            { 'blankLine': 'always', 'prev': '*', 'next': 'switch' },
            { 'blankLine': 'always', 'prev': '*', 'next': 'throw' },
            { 'blankLine': 'always', 'prev': '*', 'next': 'try' },
            { 'blankLine': 'always', 'prev': '*', 'next': 'while' }
        ],
        // 'object-property-newline': 'error',         // 强制将对象的属性放在不同的行上
        'lines-between-class-members': [            // 类成员之间非单行申明需要添加空格隔开
            'error',
            'always', { 'exceptAfterSingleLine': true }
        ],
        'space-unary-ops': 'error',                 // 单词类一元操作符后需要添加空格，非单词类不能添加空格
        'switch-colon-spacing': 'error',            // 在 switch 的冒号后添加一个或多个空格

        /* ES6 */
        /* 'arrow-body-style': [                       // 当箭头函数体的花括号可以省略时，不允许出现花括号
            'warn',
            'as-needed',
            { 'requireReturnForObjectLiteral': true } // 显示 return 对象字面量
        ],
        'arrow-parens': [							// 箭头函数参数只有一个时，不允许写圆括号
            'warn',
            'as-needed',
            { 'requireForBlockBody': true }         // 如果函数体在一个指令块中（被花括号括起来）要求使用圆括号把参数括起来
        ], */
        'arrow-spacing': 'error', 					// 要求箭头函数的 => 前后有空格
        'constructor-super': 'error',               // 派生类中构造函数强制调用 super()
        'no-confusing-arrow': 'error', 				// 禁止在可能与比较操作符混淆的地方使用箭头函数
        'no-duplicate-imports': 'error', 			// 禁止重复导入
        'no-var': 'error', 							// 要求使用let或const，而不是var
        'object-shorthand': 'error', 				// 要求对象字面量使用简写
        'prefer-const': 'error', 					// 要求使用const声明不会被修改的变量
        'prefer-template': 'warn', 				    // 使用模板字符串，而不是字符串拼接
        'rest-spread-spacing': 'error', 			// 扩展运算符...和表达式之间不允许有空格
    },
    'overrides': [
        {
            'files': ['*.ts', '*.vue'],
            'rules': {
                'no-undef': 'off'
            }
        }
    ]
}