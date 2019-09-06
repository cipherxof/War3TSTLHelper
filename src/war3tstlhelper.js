const types = {
    "cam": "camerasetup",
    "dest": "destructable",
    "item": "item",
    "rct": "rect",
    "snd": "sound",
    "trg": "trigger",
    "unit": "unit"
};

class War3TSTLHelper {

    constructor(luaCode){
        this.contents = luaCode;
    }

    genTSDefinitions(){
        const lines = this.contents.split('\n');
        const varTypes = {};
        let output = '';
        
        lines.forEach(line => {
            line = line.replace(/\s+/g, '');

            if (line.startsWith("gg_")){
                const parts = line.split('_', 2);
                
                if (parts.length >= 2){
                    const type = types[parts[1]];
                    const name = (line.indexOf('=') != -1 ? line.split('=')[0] : line);

                    if (name in varTypes == false){
                        output += `declare var ${name}: ${type};\n`

                        varTypes[name] = type;
                    }
                }
            }
        });

        return output;
    }
}

module.exports = War3TSTLHelper;