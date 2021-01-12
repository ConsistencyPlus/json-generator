const fs = require('fs');

document.getElementById("blockstateForm").onsubmit = form => {
    form.preventDefault();

    const filepath = localStorage.path;

    var blockName = document.getElementById("blockName").value;
    var modName = document.getElementById("modName").value;

    localStorage.modName = modName;
    localStorage.blockName = blockName;
    
    if (!filepath || localStorage.path === undefined) { // In progress still. Try to get this functioning later.
        return console.log('No filepath.');
    } 

    blockName = blockName.toLowerCase().split(/ +/).join('_'); // Turns the input into minecraft's block id format
    modName = modName.toLowerCase().split(/ +/).join('_'); // Turns the mod into mincraft's block id format

    // Block Creator
    if (document.getElementById("block").checked === true) {

        const jsonProduct = {
            variants: { "": { model: `${modName}:block/${blockName}` }}
        };
        
        const jsonContent = JSON.stringify(jsonProduct, null, 4);

        if (!fs.existsSync(`${filepath}\\blockstates`)) {
            fs.mkdir(`${filepath}\\blockstates`, (err) => {
                if (err) throw err;
                console.log('Made the blockstate folder.');
            });
        }

        fs.writeFile(`${filepath}\\blockstates\\${blockName}.json`, jsonContent, 'utf8', (err) => {
            if (err) throw err;
            console.log('Made file');
        });
        
        document.getElementById("generateBtn").value = "Generated!";

        setTimeout(() => {
            document.getElementById("generateBtn").value ="Generate!";
        }, 1000);
    }

    // Slab Creator
    if (document.getElementById("slab").checked === true) {
        const jsonProduct = {
            variants: {
                "type=bottom": {
                    model: `${modName}:block/${blockName}`
                },
                "type=double": {
                    model: `${modName}:block/${blockName}`
                },
                "type=top": {
                    model: `${modName}:block/${blockName}`
                }
            }
        };
        
        const jsonContent = JSON.stringify(jsonProduct, null, 4);

        if (!fs.existsSync(`${filepath}\\blockstates`)) {
            fs.mkdir(`${filepath}\\blockstates`, (err) => {
                if (err) throw err;
                console.log('Made the blockstates folder.');
            });
        }

        fs.writeFileSync(`${filepath}\\blockstates\\${blockName}_slab.json`, jsonContent, 'utf8', (err) => {
            if (err) throw err;
            console.log('Made file');
        });

        document.getElementById("generateBtn").value = "Generated!";

        setTimeout(() => {
            document.getElementById("generateBtn").value ="Generate!";
        }, 1000 );
    }

    // Stairs Creator
    if (document.getElementById("stairs").checked === true) {
        const jsonProduct = {
            variants: {
                "facing=east,half=bottom,shape=inner_left": { model: `${modName}:block/${blockName}_stairs_inner`, y: 270, uvlock: true },

                "facing=east,half=bottom,shape=inner_right": { model: `${modName}:block/${blockName}_stairs_inner` },

                "facing=east,half=bottom,shape=outer_left": { model: `${modName}:block/${blockName}_stairs_outer`, y: 270, uvlock: true },

                "facing=east,half=bottom,shape=outer_right": { model: `${modName}:block/${blockName}_stairs_outer` },

                "facing=east,half=bottom,shape=straight": { model: `${modName}:block/${blockName}_stairs` },

                "facing=east,half=top,shape=inner_left": { model: `${modName}:block/${blockName}_stairs_inner`, x: 180, uvlock: true },

                "facing=east,half=top,shape=inner_right": { model: `${modName}:block/${blockName}_stairs_inner`, x: 180, y: 90, uvlock: true },

                "facing=east,half=top,shape=outer_left": { model: `${modName}:block/${blockName}_stairs_outer`, x: 180, uvlock: true },

                "facing=east,half=top,shape=outer_right": { model: `${modName}:block/${blockName}_stairs_outer`, x: 180, y: 90, uvlock: true },

                "facing=east,half=top,shape=straight": { model: `${modName}:block/${blockName}_stairs`, x: 180, uvlock: true },

                "facing=north,half=bottom,shape=inner_left": { model: `${modName}:block/${blockName}_stairs_inner`, y: 180, uvlock: true },

                "facing=north,half=bottom,shape=inner_right": { model: `${modName}:block/${blockName}_stairs_inner`, y: 270, uvlock: true },

                "facing=north,half=bottom,shape=outer_left": { model: `${modName}:block/${blockName}_stairs_outer`, y: 180, uvlock: true },

                "facing=north,half=bottom,shape=outer_right": { model: `${modName}:block/${blockName}_stairs_outer`, y: 270, uvlock: true },

                "facing=north,half=bottom,shape=straight": { model: `${modName}:block/${blockName}_stairs`, y: 270, uvlock: true },

                "facing=north,half=top,shape=inner_left": { model: `${modName}:block/${blockName}_stairs_inner`, x: 180, y: 270, uvlock: true },

                "facing=north,half=top,shape=inner_right": { model: `${modName}:block/${blockName}_stairs_inner`, x: 180, uvlock: true },

                "facing=north,half=top,shape=outer_left": { model: `${modName}:block/${blockName}_stairs_outer`, x: 180, y: 270, uvlock: true },

                "facing=north,half=top,shape=outer_right": { model: `${modName}:block/${blockName}_stairs_outer`, x: 180, uvlock: true },

                "facing=north,half=top,shape=straight": { model: `${modName}:block/${blockName}_stairs`, x: 180, y: 270, uvlock: true },

                "facing=south,half=bottom,shape=inner_left": { model: `${modName}:block/${blockName}_stairs_inner` },

                "facing=south,half=bottom,shape=inner_right": { model: `${modName}:block/${blockName}_stairs_inner`, y: 90, uvlock: true },

                "facing=south,half=bottom,shape=outer_left": { model: `${modName}:block/${blockName}_stairs_outer` },

                "facing=south,half=bottom,shape=outer_right": { model: `${modName}:block/${blockName}_stairs_outer`, y: 90, uvlock: true },

                "facing=south,half=bottom,shape=straight": { model: `${modName}:block/${blockName}_stairs`, y: 90, uvlock: true },

                "facing=south,half=top,shape=inner_left": { model: `${modName}:block/${blockName}_stairs_inner`, x: 180, y: 90, uvlock: true },

                "facing=south,half=top,shape=inner_right": { model: `${modName}:block/${blockName}_stairs_inner`, x: 180, y: 180, uvlock: true },

                "facing=south,half=top,shape=outer_left": { model: `${modName}:block/${blockName}_stairs_outer`, x: 180, y: 90, uvlock: true },

                "facing=south,half=top,shape=outer_right": { model: `${modName}:block/${blockName}_stairs_outer`, x: 180, y: 180, uvlock: true },

                "facing=south,half=top,shape=straight": { model: `${modName}:block/${blockName}_stairs`, x: 180, y: 90, uvlock: true },

                "facing=west,half=bottom,shape=inner_left": { model: `${modName}:block/${blockName}_stairs_inner`, y: 90, uvlock: true },

                "facing=west,half=bottom,shape=inner_right": { model: `${modName}:block/${blockName}_stairs_inner`, y: 180, uvlock: true },

                "facing=west,half=bottom,shape=outer_left": { model: `${modName}:block/${blockName}_stairs_outer`, y: 90, uvlock: true },

                "facing=west,half=bottom,shape=outer_right": { model: `${modName}:block/${blockName}_stairs_outer`, y: 180, uvlock: true },

                "facing=west,half=bottom,shape=straight": { model: `${modName}:block/${blockName}_stairs`, y: 180, uvlock: true },

                "facing=west,half=top,shape=inner_left": { model: `${modName}:block/${blockName}_stairs_inner`, x: 180, y: 180, uvlock: true },

                "facing=west,half=top,shape=inner_right": { model: `${modName}:block/${blockName}_stairs_inner`, x: 180, y: 270, uvlock: true },

                "facing=west,half=top,shape=outer_left": { model: `${modName}:block/${blockName}_stairs_outer`, x: 180, y: 180, uvlock: true },

                "facing=west,half=top,shape=outer_right": { model: `${modName}:block/${blockName}_stairs_outer`, x: 180, y: 270, uvlock: true },

                "facing=west,half=top,shape=straight": { model: `${modName}:block/${blockName}_stairs`, x: 180, y: 180, uvlock: true }
            }
        };
        
        const jsonContent = JSON.stringify(jsonProduct, null, 4);

        if (!fs.existsSync(`${filepath}\\blockstates`)) {
            fs.mkdir(`${filepath}\\blockstates`, (err) => {
                if (err) throw err;
                console.log('Made the blockstates folder.');
            });
        }

        fs.writeFileSync(`${filepath}\\blockstates\\${blockName}_slab.json`, jsonContent, 'utf8', (err) => {
            if (err) throw err;
            console.log('Made file');
        });

        document.getElementById("generateBtn").value = "Generated!";

        setTimeout(() => {
            document.getElementById("generateBtn").value ="Generate!";
        }, 1000 );
    }

    // Wall Creator
    if (document.getElementById("wall").checked === true) {

        const jsonProduct = {
            "multipart": [
                { when: { up: true }, apply: { model: `${modName}:block/${blockName}_wall_post` } },

                { when: { north: low }, apply: { model: `${modName}:block/${blockName}_wall_side`, uvlock: true} },

                { when: { east: low }, apply: { model: `${modName}:block/${blockName}_wall_side`, y: 90, uvlock: true} },

                { when: { south: low }, apply: { model: `${modName}:block/${blockName}_wall_side`, y: 180, uvlock: true } },

                { when: { west: low }, apply: { model: `${modName}:block/${blockName}_wall_side`, y: 270, uvlock: true} },

                { when: { north: tall }, apply: { model: `${modName}:block/${blockName}_wall_tall`, uvlock: true } },

                { when: { east: tall }, apply: { model: `${modName}:block/${blockName}_wall_tall`, y: 90, uvlock: true } },

                { when: { south: tall }, apply: { model: `${modName}:block/${blockName}_wall_tall`, y: 180, uvlock: true } },

                { when: { west: tall }, apply: { model: `${modName}:block/${blockName}_wall_tall`, y: 270, uvlock: true } },
            ]
        };
        
        const jsonContent = JSON.stringify(jsonProduct, null, 4);

        if (!fs.existsSync(`${filepath}\\blockstates`)) {
            fs.mkdir(`${filepath}\\blockstates`, (err) => {
                if (err) throw err;
                console.log('Made the blockstate folder.');
            });
        }

        fs.writeFile(`${filepath}\\blockstates\\${blockName}_wall.json`, jsonContent, 'utf8', (err) => {
            if (err) throw err;
            console.log('Made file');
        });
        
        document.getElementById("generateBtn").value = "Generated!";

        setTimeout(() => {
            document.getElementById("generateBtn").value ="Generate!";
        }, 1000);
    }

    // Pillar creator
    if (document.getElementById("pillar").checked === true) {
        const jsonProduct = {
            variants: {
                "axis=x": {
                    model: `${modName}:block/${blockName}_pillar_horizontal`,
                    x: 90,
                    y: 90
                },
                "axis=y": {
                    model: `${modName}:block/${blockName}_pillar`
                },
                "axis=z": {
                    model: `${modName}:block/${blockName}_pillar_horizontal`,
                    x: 90
                }
            }
        };
        
        const jsonContent = JSON.stringify(jsonProduct, null, 4);

        if (!fs.existsSync(`${filepath}\\blockstates`)) {
            fs.mkdir(`${filepath}\\blockstates`, (err) => {
                if (err) throw err;
                console.log('Made the blockstates folder.');
            });
        }

        fs.writeFileSync(`${filepath}\\blockstates\\${blockName}_pillar.json`, jsonContent, 'utf8', (err) => {
            if (err) throw err;
            console.log('Made file');
        });

        document.getElementById("generateBtn").value = "Generated!";

        setTimeout(() => {
            document.getElementById("generateBtn").value ="Generate!";
        }, 1000 );
    }
};