const crypto = require('crypto');


function generateRowhash(row) {
    const rowString = Object.keys(row)
        .sort() 
        .map(key => `${key}:${row[key]}`)
        .join('|');
    
    return crypto.createHash('sha256').update(rowString).digest('hex');
}


function compareData(sourceData, migratedData) {
    
    if (sourceData.length !== migratedData.length) {
        console.log(`Row count mismatch! Source: ${sourceData.length}, Migrated: ${migratedData.length}`);
        return false;
    }

    
    for (let i = 0; i < sourceData.length; i++) {
        const sourceRow = sourceData[i];
        const migratedRow = migratedData[i];

        
        const sourceRowHash = generateRowhash(sourceRow);
        const migratedRowHash = generateRowhash(migratedRow);

        if (sourceRowHash !== migratedRowHash) {
            console.log(`Data mismatch found at row ${i}:`);
            console.log(`Source Row: ${JSON.stringify(sourceRow)}`);
            console.log(`Migrated Row: ${JSON.stringify(migratedRow)}`);
            return false;
        }
    }

    console.log('Data validation successful. Both datasets are identical.');
    return true;
}


const sourceData = [
    { id: '1', name: 'Alice', age: '30' },
    { id: '2', name: 'Bob', age: '25' },
    { id: '3', name: 'Charlie', age: '35' }
];


const migratedData = [
    { id: '1', name: 'Alice', age: '30' },
    { id: '2', name: 'Bob', age: '25' },
    { id: '3', name: 'Charlie', age: '35' }
];


const result = compareData(sourceData, migratedData);
console.log(result ? "Data is the same" : "Data mismatch found");
