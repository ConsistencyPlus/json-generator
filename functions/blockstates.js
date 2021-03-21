const fs = require('fs');

document.getElementById("blockstateForm").onsubmit = form => {
    form.preventDefault();

    const filepath = localStorage.path;
    
    var blockName = document.getElementById("blockName").value;
    var modName = document.getElementById("modName").value;
    var textureNamespace;

    if (document.getElementById("namespace").value === ``) {
        textureNamespace = document.getElementById("modName").value;
    } else {
        textureNamespace = document.getElementById("namespace").value;
    }

    localStorage.modName = modName;
    localStorage.blockName = blockName;
    localStorage.namespace = textureNamespace;

    localStorage.checkBlock = document.getElementById("block").checked;
    localStorage.checkSlab = document.getElementById("slab").checked;
    localStorage.checkStairs = document.getElementById("stairs").checked;
    localStorage.checkWall = document.getElementById("wall").checked;
    localStorage.checkGateWood = document.getElementById("gate_wood").checked;
    localStorage.checkGateStone = document.getElementById("gate_stone").checked;
    localStorage.checkPillar = document.getElementById("pillar").checked;
    
    if (document.getElementById("saveLocation").value === 'No Location') {
        return document.getElementById("errorholder").innerHTML = `Error: No save location given!`;
    }

    textureNamespace = textureNamespace.toLowerCase().trim().split(/ +/).join('_'); // Turns the texture namespace input into block id format
    blockName = blockName.toLowerCase().trim().split(/ +/).join('_'); // Turns the input into minecraft's block id format
    modName = modName.toLowerCase().trim().split(/ +/).join('_'); // Turns the mod into mincraft's block id format

    let finalBlock = blockName;

    function brickSlice () {
        const blockLength = blockName.length - 6;
        const blockSubStr = blockName.substring(blockLength);
  
        if (blockSubStr === 'bricks') {
            finalBlock = blockName.substring(0, blockName.length - 1);
        }
    }

    if (!fs.existsSync(`${filepath}\\assets\\${modName}\\blockstates`)) {
        fs.mkdir(`${filepath}\\assets\\${modName}\\blockstates`, { recursive: true}, (err) => {
            if (err) throw err;
            console.log('Made the blockstates folder.');
        });
    }

    setTimeout(() => {
        // Block Creator
        if (document.getElementById("block").checked === true) {
            const jsonProduct = {
                variants: { "": { model: `${modName}:block/${finalBlock}` }}
            };
            
            const jsonContent = JSON.stringify(jsonProduct, null, 4);

            fs.writeFile(`${filepath}\\assets\\${modName}\\blockstates\\${finalBlock}.json`, jsonContent, 'utf8', (err) => {
                if (err) throw err;
                console.log('Made block blockstate file');
            });
        }

        // Slab Creator
        if (document.getElementById("slab").checked === true) {
            brickSlice();

            const jsonProduct = {
                variants: {
                    "type=bottom": {
                        model: `${modName}:block/${finalBlock}_slab`
                    },
                    "type=double": {
                        model: `${textureNamespace}:block/${finalBlock}`
                    },
                    "type=top": {
                        model: `${modName}:block/${finalBlock}_slab_top`
                    }
                }
            };
            
            const jsonContent = JSON.stringify(jsonProduct, null, 4);

            fs.writeFile(`${filepath}\\assets\\${modName}\\blockstates\\${finalBlock}_slab.json`, jsonContent, 'utf8', (err) => {
                if (err) throw err;
                console.log('Made slab blockstate file');
            });
        }

        // Stairs Creator
        if (document.getElementById("stairs").checked === true) {
            brickSlice();

            const jsonProduct = {
                variants: {
                    "facing=east,half=bottom,shape=inner_left": { model: `${modName}:block/${finalBlock}_stairs_inner`, y: 270, uvlock: true },

                    "facing=east,half=bottom,shape=inner_right": { model: `${modName}:block/${finalBlock}_stairs_inner` },

                    "facing=east,half=bottom,shape=outer_left": { model: `${modName}:block/${finalBlock}_stairs_outer`, y: 270, uvlock: true },

                    "facing=east,half=bottom,shape=outer_right": { model: `${modName}:block/${finalBlock}_stairs_outer` },

                    "facing=east,half=bottom,shape=straight": { model: `${modName}:block/${finalBlock}_stairs` },

                    "facing=east,half=top,shape=inner_left": { model: `${modName}:block/${finalBlock}_stairs_inner`, x: 180, uvlock: true },

                    "facing=east,half=top,shape=inner_right": { model: `${modName}:block/${finalBlock}_stairs_inner`, x: 180, y: 90, uvlock: true },

                    "facing=east,half=top,shape=outer_left": { model: `${modName}:block/${finalBlock}_stairs_outer`, x: 180, uvlock: true },

                    "facing=east,half=top,shape=outer_right": { model: `${modName}:block/${finalBlock}_stairs_outer`, x: 180, y: 90, uvlock: true },

                    "facing=east,half=top,shape=straight": { model: `${modName}:block/${finalBlock}_stairs`, x: 180, uvlock: true },

                    "facing=north,half=bottom,shape=inner_left": { model: `${modName}:block/${finalBlock}_stairs_inner`, y: 180, uvlock: true },

                    "facing=north,half=bottom,shape=inner_right": { model: `${modName}:block/${finalBlock}_stairs_inner`, y: 270, uvlock: true },

                    "facing=north,half=bottom,shape=outer_left": { model: `${modName}:block/${finalBlock}_stairs_outer`, y: 180, uvlock: true },

                    "facing=north,half=bottom,shape=outer_right": { model: `${modName}:block/${finalBlock}_stairs_outer`, y: 270, uvlock: true },

                    "facing=north,half=bottom,shape=straight": { model: `${modName}:block/${finalBlock}_stairs`, y: 270, uvlock: true },

                    "facing=north,half=top,shape=inner_left": { model: `${modName}:block/${finalBlock}_stairs_inner`, x: 180, y: 270, uvlock: true },

                    "facing=north,half=top,shape=inner_right": { model: `${modName}:block/${finalBlock}_stairs_inner`, x: 180, uvlock: true },

                    "facing=north,half=top,shape=outer_left": { model: `${modName}:block/${finalBlock}_stairs_outer`, x: 180, y: 270, uvlock: true },

                    "facing=north,half=top,shape=outer_right": { model: `${modName}:block/${finalBlock}_stairs_outer`, x: 180, uvlock: true },

                    "facing=north,half=top,shape=straight": { model: `${modName}:block/${finalBlock}_stairs`, x: 180, y: 270, uvlock: true },

                    "facing=south,half=bottom,shape=inner_left": { model: `${modName}:block/${finalBlock}_stairs_inner` },

                    "facing=south,half=bottom,shape=inner_right": { model: `${modName}:block/${finalBlock}_stairs_inner`, y: 90, uvlock: true },

                    "facing=south,half=bottom,shape=outer_left": { model: `${modName}:block/${finalBlock}_stairs_outer` },

                    "facing=south,half=bottom,shape=outer_right": { model: `${modName}:block/${finalBlock}_stairs_outer`, y: 90, uvlock: true },

                    "facing=south,half=bottom,shape=straight": { model: `${modName}:block/${finalBlock}_stairs`, y: 90, uvlock: true },

                    "facing=south,half=top,shape=inner_left": { model: `${modName}:block/${finalBlock}_stairs_inner`, x: 180, y: 90, uvlock: true },

                    "facing=south,half=top,shape=inner_right": { model: `${modName}:block/${finalBlock}_stairs_inner`, x: 180, y: 180, uvlock: true },

                    "facing=south,half=top,shape=outer_left": { model: `${modName}:block/${finalBlock}_stairs_outer`, x: 180, y: 90, uvlock: true },

                    "facing=south,half=top,shape=outer_right": { model: `${modName}:block/${finalBlock}_stairs_outer`, x: 180, y: 180, uvlock: true },

                    "facing=south,half=top,shape=straight": { model: `${modName}:block/${finalBlock}_stairs`, x: 180, y: 90, uvlock: true },

                    "facing=west,half=bottom,shape=inner_left": { model: `${modName}:block/${finalBlock}_stairs_inner`, y: 90, uvlock: true },

                    "facing=west,half=bottom,shape=inner_right": { model: `${modName}:block/${finalBlock}_stairs_inner`, y: 180, uvlock: true },

                    "facing=west,half=bottom,shape=outer_left": { model: `${modName}:block/${finalBlock}_stairs_outer`, y: 90, uvlock: true },

                    "facing=west,half=bottom,shape=outer_right": { model: `${modName}:block/${finalBlock}_stairs_outer`, y: 180, uvlock: true },

                    "facing=west,half=bottom,shape=straight": { model: `${modName}:block/${finalBlock}_stairs`, y: 180, uvlock: true },

                    "facing=west,half=top,shape=inner_left": { model: `${modName}:block/${finalBlock}_stairs_inner`, x: 180, y: 180, uvlock: true },

                    "facing=west,half=top,shape=inner_right": { model: `${modName}:block/${finalBlock}_stairs_inner`, x: 180, y: 270, uvlock: true },

                    "facing=west,half=top,shape=outer_left": { model: `${modName}:block/${finalBlock}_stairs_outer`, x: 180, y: 180, uvlock: true },

                    "facing=west,half=top,shape=outer_right": { model: `${modName}:block/${finalBlock}_stairs_outer`, x: 180, y: 270, uvlock: true },

                    "facing=west,half=top,shape=straight": { model: `${modName}:block/${finalBlock}_stairs`, x: 180, y: 180, uvlock: true }
                }
            };
            
            const jsonContent = JSON.stringify(jsonProduct, null, 4);

            fs.writeFile(`${filepath}\\assets\\${modName}\\blockstates\\${finalBlock}_stairs.json`, jsonContent, 'utf8', (err) => {
                if (err) throw err;
                console.log('Made stairs blockstate file');
            });
        }

        // Wall Creator
        if (document.getElementById("wall").checked === true) {
            brickSlice();

            const jsonProduct = {
                "multipart": [
                    { when: { up: true }, apply: { model: `${modName}:block/${finalBlock}_wall_post` } },

                    { when: { north: "low" }, apply: { model: `${modName}:block/${finalBlock}_wall_side`, uvlock: true} },

                    { when: { east: "low" }, apply: { model: `${modName}:block/${finalBlock}_wall_side`, y: 90, uvlock: true} },

                    { when: { south: "low" }, apply: { model: `${modName}:block/${finalBlock}_wall_side`, y: 180, uvlock: true } },

                    { when: { west: "low" }, apply: { model: `${modName}:block/${finalBlock}_wall_side`, y: 270, uvlock: true} },

                    { when: { north: "tall" }, apply: { model: `${modName}:block/${finalBlock}_wall_side_tall`, uvlock: true } },

                    { when: { east: "tall" }, apply: { model: `${modName}:block/${finalBlock}_wall_side_tall`, y: 90, uvlock: true } },

                    { when: { south: "tall" }, apply: { model: `${modName}:block/${finalBlock}_wall_side_tall`, y: 180, uvlock: true } },

                    { when: { west: "tall" }, apply: { model: `${modName}:block/${finalBlock}_wall_side_tall`, y: 270, uvlock: true } },
                ]
            };
            
            const jsonContent = JSON.stringify(jsonProduct, null, 4);

            fs.writeFile(`${filepath}\\assets\\${modName}\\blockstates\\${finalBlock}_wall.json`, jsonContent, 'utf8', (err) => {
                if (err) throw err;
                console.log('Made wall blockstate file');
            });
        }

        // Pillar creator
        if (document.getElementById("pillar").checked === true) {
            brickSlice();
            
            const jsonProduct = {
                variants: {
                    "axis=x": {
                        model: `${modName}:block/${finalBlock}_pillar_horizontal`,
                        x: 90,
                        y: 90
                    },
                    "axis=y": {
                        model: `${modName}:block/${finalBlock}_pillar`
                    },
                    "axis=z": {
                        model: `${modName}:block/${finalBlock}_pillar_horizontal`,
                        x: 90
                    }
                }
            };
            
            const jsonContent = JSON.stringify(jsonProduct, null, 4);

            fs.writeFile(`${filepath}\\assets\\${modName}\\blockstates\\${finalBlock}_pillar.json`, jsonContent, 'utf8', (err) => {
                if (err) throw err;
                console.log('Made pillar blockstate file');
            });
        }

        // Gate - Wood Creator
        if (document.getElementById("gate_wood").checked === true) {
            brickSlice();
            
            const jsonProduct = {
                variants: {
                  "facing=east,in_wall=false,open=false": {
                   uvlock: true,
                   y: 270,
                   model: `${modName}:block/${finalBlock}_fence_gate`
                 },
                 "facing=east,in_wall=false,open=true": {
                   uvlock: true,
                   y: 270,
                   model: `${modName}:block/${finalBlock}_fence_gate_open`
                 },
                 "facing=east,in_wall=true,open=false": {
                   uvlock: true,
                   y: 270,
                   model: `${modName}:block/${finalBlock}_fence_gate_wall`
                 },
                 "facing=east,in_wall=true,open=false": {
                   uvlock: true,
                   y: 270,
                   model: `${modName}:block/${finalBlock}_fence_gate_wall_open`
                 },
                 "facing=north,in_wall=false,open=false": {
                   uvlock: true,
                   y: 180,
                   model: `${modName}:block/${finalBlock}_fence_gate`
                 },
                 "facing=north,in_wall=false,open=true": {
                   uvlock: true,
                   y: 180,
                   model: `${modName}:block/${finalBlock}_fence_gate_open`
                 },
                 "facing=north,in_wall=true,open=false": {
                   uvlock: true,
                   y: 180,
                   model: `${modName}:block/${finalBlock}_fence_gate_wall`
                 },
                 "facing=north,in_wall=true,open=true": {
                   uvlock: true,
                   y: 180,
                   model: `${modName}:block/${finalBlock}_fence_gate_wall_open`
                 },
                 "facing=south,in_wall=false,open=false": {
                   uvlock: true,
                   model: `${modName}:block/${finalBlock}_fence_gate`
                 },
                 "facing=south,in_wall=false,open=true": {
                   uvlock: true,
                   model: `${modName}:block/${finalBlock}_fence_gate_open`
                 },
                 "facing=south,in_wall=true,open=false": {
                   uvlock: true,
                   model: `${modName}:block/${finalBlock}_fence_gate_wall`
                 },
                 "facing=south,in_wall=true,open=true": {
                   uvlock: true,
                   model: `${modName}:block/${finalBlock}_fence_gate_wall_open`
                 },
                 "facing=west,in_wall=false,open=false": {
                   uvlock: true,
                   y: 90,
                   model: `${modName}:block/${finalBlock}_fence_gate`
                 },
                 "facing=west,in_wall=false,open=true": {
                   uvlock: true,
                   y: 90,
                   model: `${modName}:block/${finalBlock}_fence_gate_open`
                 },
                 "facing=west,in_wall=true,open=false": {
                   uvlock: true,
                   y: 90,
                   model: `${modName}:block/${finalBlock}_fence_gate_wall`
                 },
                 "facing=west,in_wall=true,open=true": {
                   uvlock: true,
                   y: 90,
                   model: `${modName}:block/${finalBlock}_fence_gate_wall_open`
                 }
               }
            };
            
            const jsonContent = JSON.stringify(jsonProduct, null, 4);

            fs.writeFile(`${filepath}\\assets\\${modName}\\blockstates\\${finalBlock}fence_gate.json`, jsonContent, 'utf8', (err) => {
                if (err) throw err;
                console.log('Made Gate - Wood blockstate file');
            });
        }
        
        if (document.getElementById("gate_stone").checked === true) {
            brickSlice();
            
            const jsonProduct = {
                variants: {
                  "facing=east,in_wall=false,open=false": {
                   uvlock: true,
                   y: 270,
                   model: `${modName}:block/${finalBlock}_gate_wall`
                 },
                 "facing=east,in_wall=false,open=true": {
                   uvlock: true,
                   y: 270,
                   model: `${modName}:block/${finalBlock}_gate_wall_open`
                 },
                 "facing=east,in_wall=true,open=false": {
                   uvlock: true,
                   y: 270,
                   model: `${modName}:block/${finalBlock}_gate_wall`
                 },
                 "facing=east,in_wall=true,open=false": {
                   uvlock: true,
                   y: 270,
                   model: `${modName}:block/${finalBlock}_gate_wall_open`
                 },
                 "facing=north,in_wall=false,open=false": {
                   uvlock: true,
                   y: 180,
                   model: `${modName}:block/${finalBlock}_gate_wall`
                 },
                 "facing=north,in_wall=false,open=true": {
                   uvlock: true,
                   y: 180,
                   model: `${modName}:block/${finalBlock}_gate_wall_open`
                 },
                 "facing=north,in_wall=true,open=false": {
                   uvlock: true,
                   y: 180,
                   model: `${modName}:block/${finalBlock}_gate_wall`
                 },
                 "facing=north,in_wall=true,open=true": {
                   uvlock: true,
                   y: 180,
                   model: `${modName}:block/${finalBlock}_gate_wall_open`
                 },
                 "facing=south,in_wall=false,open=false": {
                   uvlock: true,
                   model: `${modName}:block/${finalBlock}_gate_wall`
                 },
                 "facing=south,in_wall=false,open=true": {
                   uvlock: true,
                   model: `${modName}:block/${finalBlock}_gate_wall_open`
                 },
                 "facing=south,in_wall=true,open=false": {
                   uvlock: true,
                   model: `${modName}:block/${finalBlock}_gate_wall`
                 },
                 "facing=south,in_wall=true,open=true": {
                   uvlock: true,
                   model: `${modName}:block/${finalBlock}_gate_wall_open`
                 },
                 "facing=west,in_wall=false,open=false": {
                   uvlock: true,
                   y: 90,
                   model: `${modName}:block/${finalBlock}_gate_wall`
                 },
                 "facing=west,in_wall=false,open=true": {
                   uvlock: true,
                   y: 90,
                   model: `${modName}:block/${finalBlock}_gate_wall_open`
                 },
                 "facing=west,in_wall=true,open=false": {
                   uvlock: true,
                   y: 90,
                   model: `${modName}:block/${finalBlock}_gate_wall`
                 },
                 "facing=west,in_wall=true,open=true": {
                   uvlock: true,
                   y: 90,
                   model: `${modName}:block/${finalBlock}_gate_wall_open`
                 }
               }
            };
            
            const jsonContent = JSON.stringify(jsonProduct, null, 4);

            fs.writeFile(`${filepath}\\assets\\${modName}\\blockstates\\${finalBlock}_gate.json`, jsonContent, 'utf8', (err) => {
                if (err) throw err;
                console.log('Made Gate - Stone blockstate file');
            });
        }
        
        if (document.getElementById("block").checked === false &&
            document.getElementById("slab").checked === false &&
            document.getElementById("stairs").checked === false &&
            document.getElementById("wall").checked === false &&
            document.getElementById("gate_wood").checked === false &&
            document.getElementById("gate_stone").checked === false &&
            document.getElementById("pillar").checked === false) {
                return document.getElementById("errorholder").innerHTML = "Error: No boxes were selected!";
        }
            
        document.getElementById("generateBtn").value = "Generated!";
        document.getElementById("errorholder").innerHTML = "";

        setTimeout(() => {
            document.getElementById("generateBtn").value ="Generate!";
        }, 1000);

    }, 10);
};
