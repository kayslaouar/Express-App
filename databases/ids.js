const ids = {userIndex: 0, postIndex: 0, commentIndex: 0, ids: []};

for (let i = 0; i < 10000; ++i) {
    ids.ids.push(i);
}

console.log(JSON.stringify(ids));

// generate ids.json: node databases/ids.js > databases/ids.json