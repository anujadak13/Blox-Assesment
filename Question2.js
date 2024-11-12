const Decimal = require('decimal.js');

function PasreJsonString(string) {
    return JSON.parse(string, (key, val) => {
        
        if (typeof val === 'string' && /^-?\d+n$/.test(val)) {
            return BigInt(val.slice(0, -1)); 
        }
        
        
        if (typeof val === 'string' && /^-?\d+(\.\d+)?$/.test(val)) {
            
            if (val.includes('.') || val.includes('e')) {
                return new Decimal(val);
            }
        }
        
        return val;
    });
}

const string = '{"largenum": "123476t5589067845678901279867890123456098n", "floatnum": "765.65378901234567874663234567890", "regularnum": 32}';

const ans = PasreJsonString(string);
console.log(ans);

