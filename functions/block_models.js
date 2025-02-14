const fs = require('fs');

function allTextures () {
    document.getElementById("sideTexture").setAttribute("disabled", "true");
    document.getElementById("topTexture").setAttribute("disabled", "true");
    document.getElementById("westTexture").setAttribute("disabled", "true");
    document.getElementById("southTexture").setAttribute("disabled", "true");
    document.getElementById("eastTexture").setAttribute("disabled", "true");

    document.getElementById("mainLabel").innerHTML = "Main Texture:";
    localStorage.bmodelMode = "all";
}

function threeDirections () {
    document.getElementById("sideTexture").removeAttribute("disabled");
    document.getElementById("topTexture").removeAttribute("disabled");
    document.getElementById("westTexture").setAttribute("disabled", "true");
    document.getElementById("southTexture").setAttribute("disabled", "true");
    document.getElementById("eastTexture").setAttribute("disabled", "true");

    document.getElementById("mainLabel").innerHTML = "Bottom Texture:";
    document.getElementById("sideLabel").innerHTML = "Side Texture:";
    localStorage.bmodelMode = "three";
}

function directionalTextures () {
    document.getElementById("sideTexture").removeAttribute("disabled");
    document.getElementById("topTexture").removeAttribute("disabled");
    document.getElementById("westTexture").removeAttribute("disabled");
    document.getElementById("southTexture").removeAttribute("disabled");
    document.getElementById("eastTexture").removeAttribute("disabled");

    document.getElementById("mainLabel").innerHTML = "Bottom Texture:";
    document.getElementById("sideLabel").innerHTML = "North Texture:";
    localStorage.bmodelMode = "six";
}

function frontDiff () {
    document.getElementById("sideTexture").removeAttribute("disabled");
    document.getElementById("topTexture").removeAttribute("disabled");
    document.getElementById("eastTexture").removeAttribute("disabled");
    document.getElementById("westTexture").setAttribute("disabled", "true");
    document.getElementById("southTexture").setAttribute("disabled", "true");

    document.getElementById("mainLabel").innerHTML = "Bottom Texture:";
    document.getElementById("eastLabel").innerHTML = "Front Texture:";
    document.getElementById("sideLabel").innerHTML = "Side Texture:";
    localStorage.bmodelMode = "front";
}

document.getElementById("blockModelForm").onsubmit = form => {
    form.preventDefault();

    const filepath = localStorage.path;

    var textureNamespace;
    var blockID;
    var blockName = document.getElementById("blockName").value;
    var modName = document.getElementById("modName").value;

    if (document.getElementById("blockID").value === ``) {
        blockID = document.getElementById("blockName").value;
    } else {
        blockID = document.getElementById("blockID").value;
    }

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
    localStorage.checkWallTri = document.getElementById("wall_tri").checked;
    localStorage.checkPillar = document.getElementById("pillar").checked;

    var topTexture = document.getElementById("topTexture").value;
    var sideTexture = document.getElementById("sideTexture").value;
    var eastTexture = document.getElementById("eastTexture").value;
    var southTexture = document.getElementById("southTexture").value;
    var westTexture = document.getElementById("westTexture").value;

    localStorage.topTexture = topTexture;
    localStorage.sideTexture = sideTexture;
    localStorage.eastTexture = eastTexture;
    localStorage.southTexture = southTexture;
    localStorage.westTexture = westTexture;
    
    if (document.getElementById("saveLocation").value === 'No Location') {
        return document.getElementById("errorholder").innerHTML = `Error: No save location given!`;
    }

    blockName = blockName.toLowerCase().trim().split(/ +/).join('_');
    modName = modName.toLowerCase().trim().split(/ +/).join('_');
    textureNamespace = textureNamespace.toLowerCase().trim().split(/ +/).join('_');
    topTexture = topTexture.toLowerCase().trim().split(/ +/).join('_');
    sideTexture = sideTexture.toLowerCase().trim().split(/ +/).join('_');
    eastTexture = eastTexture.toLowerCase().trim().split(/ +/).join('_');
    westTexture = westTexture.toLowerCase().trim().split(/ +/).join('_');
    southTexture = southTexture.toLowerCase().trim().split(/ +/).join('_');

    let finalBlock = blockID;

    function brickSlice () {
        const blockLength = blockID.length - 6;
        const blockSubStr = blockID.substring(blockLength);
  
        if (blockSubStr === 'bricks') {
            finalBlock = blockID.substring(0, blockID.length - 1);
        }
    }

    if (!fs.existsSync(`${filepath}\\assets\\${modName}\\models\\block`)) {
        fs.mkdir(`${filepath}\\assets\\${modName}\\models\\block`, {recursive: true}, (err) => {
            if (err) throw err;
            console.log('Made the model/block/ folder.');
        });
    }

    setTimeout(() => {
        // Block Creator
        if (document.getElementById("block").checked === true) {
            let finalProduct = {};

            if (document.getElementById("all").checked === true) {
                finalProduct = {
                    parent: `minecraft:block/cube_all`,
                    textures: {
                        all: `${textureNamespace}:block/${blockName}`
                    }  
                };
            }

            if (document.getElementById("threeMain").checked === true) {
                finalProduct = {
                    parent: `minecraft:block/orientable`,
                    textures: {
                        top: `${textureNamespace}:block/${topTexture}`,
                        bottom: `${textureNamespace}:block/${blockName}`,
                        side: `${textureNamespace}:block/${sideTexture}`
                    } 
                };
            }

            if (document.getElementById("directional").checked === true) {
                finalProduct = {
                    parent: `minecraft:block/cube`,
                    textures: {
                        particle: `${textureNamespace}:block/${westTexture}`,
                        north: `${textureNamespace}:block/${sideTexture}`,
                        south: `${textureNamespace}:block/${southTexture}`,
                        east: `${textureNamespace}:block/${eastTexture}`,
                        west: `${textureNamespace}:block/${westTexture}`,
                        up: `${textureNamespace}:block/${topTexture}`,
                        down: `${textureNamespace}:block/${blockName}`
                    }
                };
            }

            if (document.getElementById("diffFront").checked === true) {
                finalProduct = {
                    parent: `minecraft:block/orientable`,
                    textures: {
                        top: `${textureNamespace}:block/${topTexture}`,
                        bottom: `${textureNamespace}:block/${blockName}`,
                        side: `${textureNamespace}:block/${sideTexture}`,
                        front: `${textureNamespace}:block/${eastTexture}`
                    } 
                };
            }
            
            const jsonContent = JSON.stringify(finalProduct, null, 4);

            fs.writeFile(`${filepath}\\assets\\${modName}\\models\\block\\${blockID}.json`, jsonContent, 'utf8', (err) => {
                if (err) throw err;
                console.log('Made block file');
            });
        }

        // Slab Creator
        if (document.getElementById("slab").checked === true) {
            brickSlice();
            
            let finalProduct1 = {};
            let finalProduct2 = {};

            if (document.getElementById("all").checked === true) {
                finalProduct1 = {
                    parent: `minecraft:block/slab`,
                    textures: {
                        top: `${textureNamespace}:block/${blockName}`,
                        bottom: `${textureNamespace}:block/${blockName}`,
                        side: `${textureNamespace}:block/${blockName}`
                    } 
                };

                finalProduct2 = {
                    parent: `minecraft:block/slab_top`,
                    textures: {
                        top: `${textureNamespace}:block/${blockName}`,
                        bottom: `${textureNamespace}:block/${blockName}`,
                        side: `${textureNamespace}:block/${blockName}`
                    } 
                };
            }

            if (document.getElementById("threeMain").checked === true) {
                finalProduct1 = {
                    parent: `minecraft:block/slab`,
                    textures: {
                        top: `${textureNamespace}:block/${topTexture}`,
                        bottom: `${textureNamespace}:block/${blockName}`,
                        side: `${textureNamespace}:block/${sideTexture}`
                    } 
                };

                finalProduct2 = {
                    parent: `minecraft:block/slab_top`,
                    textures: {
                        top: `${textureNamespace}:block/${topTexture}`,
                        bottom: `${textureNamespace}:block/${blockName}`,
                        side: `${textureNamespace}:block/${sideTexture}`
                    } 
                };
            }

            if (document.getElementById("directional").checked === true) {
                finalProduct = {
                    parent: `minecraft:block/slab`,
                    textures: {
                        top: `${textureNamespace}:block/${topTexture}`,
                        bottom: `${textureNamespace}:block/${blockName}`,
                        side: `${textureNamespace}:block/${sideTexture}`
                    }
                };

                finalProduct = {
                    parent: `minecraft:block/slab_top`,
                    textures: {
                        top: `${textureNamespace}:block/${westTexture}`,
                        bottom: `${textureNamespace}:block/${southTexture}`,
                        side: `${textureNamespace}:block/${eastTexture}`
                    } 
                };
            }
            
            const jsonContent1 = JSON.stringify(finalProduct1, null, 4);
            const jsonContent2 = JSON.stringify(finalProduct2, null, 4);

            fs.writeFile(`${filepath}\\assets\\${modName}\\models\\block\\${finalBlock}_slab.json`, jsonContent1, 'utf8', (err) => {
                if (err) throw err;
                console.log('Made slab file.');
            });

            fs.writeFile(`${filepath}\\assets\\${modName}\\models\\block\\${finalBlock}_slab_top.json`, jsonContent2, 'utf8', (err) => {
                if (err) throw err;
                console.log('Made slab_top file.');
            });
        }

        // Stair Creator
        if (document.getElementById("stairs").checked === true) {
            brickSlice();

            let finalProduct1 = {};
            let finalProduct2 = {};
            let finalProduct3 = {};
            
            if (document.getElementById("all").checked === true) {
                finalProduct1 = {
                    parent: "minecraft:block/stairs",
                    textures: {
                        bottom: `${textureNamespace}:block/${blockName}`,
                        top: `${textureNamespace}:block/${blockName}`,
                        side: `${textureNamespace}:block/${blockName}`
                    }
                };

                finalProduct2 = {
                    parent: "minecraft:block/inner_stairs",
                    textures: {
                        bottom: `${textureNamespace}:block/${blockName}`,
                        top: `${textureNamespace}:block/${blockName}`,
                        side: `${textureNamespace}:block/${blockName}`
                    } 
                };

                finalProduct3 = {
                    parent: "minecraft:block/outer_stairs",
                    textures: {
                        bottom: `${textureNamespace}:block/${blockName}`,
                        top: `${textureNamespace}:block/${blockName}`,
                        side: `${textureNamespace}:block/${blockName}`
                    }
                };
            }

            if (document.getElementById("threeMain").checked === true || document.getElementById("directional").checked === true) {
                finalProduct1 = {
                    parent: "minecraft:block/stairs",
                    textures: {
                        bottom: `${textureNamespace}:block/${blockName}`,
                        top: `${textureNamespace}:block/${topTexture}`,
                        side: `${textureNamespace}:block/${sideTexture}`
                    }
                };

                finalProduct2 = {
                    parent: "minecraft:block/inner_stairs",
                    textures: {
                        bottom: `${textureNamespace}:block/${blockName}`,
                        top: `${textureNamespace}:block/${topTexture}`,
                        side: `${textureNamespace}:block/${sideTexture}`
                    } 
                };

                finalProduct3 = {
                    parent: "minecraft:block/outer_stairs",
                    textures: {
                        bottom: `${textureNamespace}:block/${blockName}`,
                        top: `${textureNamespace}:block/${topTexture}`,
                        side: `${textureNamespace}:block/${sideTexture}`
                    }
                };
            }
            
            const jsonContent1 = JSON.stringify(finalProduct1, null, 4);
            const jsonContent2 = JSON.stringify(finalProduct2, null, 4);
            const jsonContent3 = JSON.stringify(finalProduct3, null, 4);

            fs.writeFile(`${filepath}\\assets\\${modName}\\models\\block\\${finalBlock}_stairs.json`, jsonContent1, 'utf8', (err) => {
                if (err) throw err;
                console.log('Made stairs file.');
            });

            fs.writeFile(`${filepath}\\assets\\${modName}\\models\\block\\${finalBlock}_stairs_inner.json`, jsonContent2, 'utf8', (err) => {
                if (err) throw err;
                console.log('Made inner stairs file.');
            });

            fs.writeFile(`${filepath}\\assets\\${modName}\\models\\block\\${finalBlock}_stairs_outer.json`, jsonContent3, 'utf8', (err) => {
                if (err) throw err;
                console.log('Made outer stairs file.');
            });
        }
        
        // Wall Creator
        if (document.getElementById("wall").checked === true) {
            brickSlice();
            
            let finalProduct1 = {};
            let finalProduct2 = {};
            let finalProduct3 = {};    
            
         if (document.getElementById("all").checked === true) { 
            const finalProduct1 = {
                parent: `minecraft:block/template_wall_post`,
                textures: {
                    wall: `${textureNamespace}:block/${blockID}`
                }
            };

            const finalProduct2 = {
                parent: `minecraft:block/template_wall_side`,
                textures: {
                    wall: `${textureNamespace}:block/${blockID}`
                }
            };

            const finalProduct3 = {
                parent: `minecraft:block/template_wall_side_tall`,
                textures: {
                    wall: `${textureNamespace}:block/${blockID}`
                }
            };     
         }
            
            if (document.getElementById("threeMain").checked === true || document.getElementById("directional").checked === true) {
                 const finalProduct1 = {
                parent: `consistency_plus:block/consistency_template_wall_post_tri`,
                textures: {
                    wall: `${textureNamespace}:block/${sideTexture}`,
                    wall_top: `${textureNamespace}:block/${topTexture}`,
                    wall_bottom: `${textureNamespace}:block/${blockName}`
                }
            };

            const finalProduct2 = {
                parent: `consistency_plus:block/consistency_template_wall_side_tri`,
                textures: {
                    wall: `${textureNamespace}:block/${sideTexture}`,
                    wall_top: `${textureNamespace}:block/${topTexture}`,
                    wall_bottom: `${textureNamespace}:block/${blockName}`
                }
            };

            const finalProduct3 = {
                parent: `consistency_plus:block/consistency_template_wall_side_tall_tri`,
                textures: {
                    wall: `${textureNamespace}:block/${sideTexture}`,
                    wall_top: `${textureNamespace}:block/${topTexture}`,
                    wall_bottom: `${textureNamespace}:block/${blockName}`                
                }
            };     
         }
            
            const jsonContent1 = JSON.stringify(finalProduct1, null, 4);
            const jsonContent2 = JSON.stringify(finalProduct2, null, 4);
            const jsonContent3 = JSON.stringify(finalProduct3, null, 4);

            fs.writeFile(`${filepath}\\assets\\${modName}\\models\\block\\${finalBlock}_wall_post.json`, jsonContent1, 'utf8', (err) => {
                if (err) throw err;
                console.log('Made the wall post file.');
            });

            fs.writeFile(`${filepath}\\assets\\${modName}\\models\\block\\${finalBlock}_wall_side.json`, jsonContent2, 'utf8', (err) => {
                if (err) throw err;
                console.log('Made the wall side file.');
            });

            fs.writeFile(`${filepath}\\assets\\${modName}\\models\\block\\${finalBlock}_wall_side_tall.json`, jsonContent3, 'utf8', (err) => {
                if (err) throw err;
                console.log('Made the wall side top file.');
            });
        }

        // Pillar Creator
        if (document.getElementById("pillar").checked === true) {
            brickSlice();
            
            const jsonProduct1 = {
                parent: "minecraft:block/cube_column",
                textures: {
                    end: `${textureNamespace}:block/${blockName}_pillar_top`,
                    side: `${textureNamespace}:block/${blockName}_pillar`
                }
            };

            const jsonProduct2 = {
                parent: "minecraft:block/cube_column_horizontal",
                textures: {
                    end: `${textureNamespace}:block/${blockName}_pillar_top`,
                    side: `${textureNamespace}:block/${blockName}_pillar`
                }
            };
            
            const jsonContent1 = JSON.stringify(jsonProduct1, null, 4);
            const jsonContent2 = JSON.stringify(jsonProduct2, null, 4);

            fs.writeFile(`${filepath}\\assets\\${modName}\\models\\block\\${finalBlock}_pillar.json`, jsonContent1, 'utf8', (err) => {
                if (err) throw err;
                console.log('Made pillar file.');
            });

            fs.writeFile(`${filepath}\\assets\\${modName}\\models\\block\\${finalBlock}_pillar_horizontal.json`, jsonContent2, 'utf8', (err) => {
                if (err) throw err;
                console.log('Made pillar horizontal file.');
            });

        }

        // Wooden Gate Creator
        
        if (document.getElementById("gate_wood").checked === true) {
            brickSlice();
            
            const jsonProduct1 = {
                parent: "minecraft:block/template_fence_gate",
                textures: {
                    texture: `${textureNamespace}:block/${blockName}`
                }
            };

            const jsonProduct2 = {
                parent: "minecraft:block/template_fence_gate_open",
                textures: {
                    texture: `${textureNamespace}:block/${blockName}`
                }
            };

           const jsonProduct3 = {
                parent: "minecraft:block/template_fence_gate_wall",
                textures: {
                    texture: `${textureNamespace}:block/${blockName}`
                }
            };

            const jsonProduct4 = {
                parent: "minecraft:block/template_fence_gate_wall_open",
                textures: {
                    texture: `${textureNamespace}:block/${blockName}`
                }
            };
            
            const jsonContent1 = JSON.stringify(jsonProduct1, null, 4);
            const jsonContent2 = JSON.stringify(jsonProduct2, null, 4);
            const jsonContent3 = JSON.stringify(jsonProduct3, null, 4);
            const jsonContent4 = JSON.stringify(jsonProduct4, null, 4);

            fs.writeFile(`${filepath}\\assets\\${modName}\\models\\block\\${finalBlock}_fence_gate.json`, jsonContent1, 'utf8', (err) => {
                if (err) throw err;
                console.log('Made Gate - Wood file');
            });

            fs.writeFile(`${filepath}\\assets\\${modName}\\models\\block\\${finalBlock}_fence_gate_open.json`, jsonContent2, 'utf8', (err) => {
                if (err) throw err;
                console.log('Made Open Gate - Wood file.');
            });
            
            fs.writeFile(`${filepath}\\assets\\${modName}\\models\\block\\${finalBlock}_fence_gate_wall.json`, jsonContent3, 'utf8', (err) => {
                if (err) throw err;
                console.log('Made Wall Gate - Wood file');
            });

            fs.writeFile(`${filepath}\\assets\\${modName}\\models\\block\\${finalBlock}_fence_gate_wall_open.json`, jsonContent2, 'utf8', (err) => {
                if (err) throw err;
                console.log('Made Open Wall Gate - Wood file.');
            });

        }
        
        // Stone gate creator        
        
        if (document.getElementById("gate_stone").checked === true) {
            brickSlice();

           const jsonProduct1 = {
                parent: "consistency_plus:block/template_consistency_gate_wall",
                textures: {
                    texture: `${textureNamespace}:block/${blockName}`
                }
            };

            const jsonProduct2 = {
                parent: "consistency_plus:block/template_consistency_gate_wall_open",
                textures: {
                    texture: `${textureNamespace}:block/${blockName}`
                }
            };
            
            const jsonContent1 = JSON.stringify(jsonProduct1, null, 4);
            const jsonContent2 = JSON.stringify(jsonProduct2, null, 4);

            fs.writeFile(`${filepath}\\assets\\${modName}\\models\\block\\${finalBlock}_gate.json`, jsonContent1, 'utf8', (err) => {
                if (err) throw err;
                console.log('Made Gate - Stone file');
            });

            fs.writeFile(`${filepath}\\assets\\${modName}\\models\\block\\${finalBlock}_gate_open.json`, jsonContent2, 'utf8', (err) => {
                if (err) throw err;
                console.log('Made Open Gate - Stone file.');
            });

        }
        
        if (document.getElementById("block").checked === false &&
            document.getElementById("slab").checked === false &&
            document.getElementById("stairs").checked === false &&
            document.getElementById("gate_wood").checked === false &&
            document.getElementById("gate_stone").checked === false &&
            document.getElementById("wall").checked === false &&
            document.getElementById("pillar").checked === false) {
                return document.getElementById("errorholder").innerHTML = "Error: No boxes were selected!";
        }  
                    
        document.getElementById("errorholder").innerHTML = "";
        document.getElementById("generateBtn").value = "Generated!";

        setTimeout(() => {
            document.getElementById("generateBtn").value ="Generate!";
        }, 1000);
        
    }, 10);
};
