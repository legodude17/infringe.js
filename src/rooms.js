let rooms = {};
rooms.default = {
  map: [
    'aabs',
    'saba',
  ],
  mapParsed: [],
  entitys: ['0,0,enemy/texture1', '10,10,friend/texture2'],
  textureMap: { a: 'texture3', b: 'texture4', s: 'texture0' },
  music: 'room.music',
  next: 'next room',
};
rooms.Bed = {
  map: [
    'wwwwwwwwww',
    'ccccccwwww',
    'cbtccclllp',
    'ccccccwwww',
    'wwwwwwwwww',
  ],
  mapParsed: [],
  textureMap: { 
t: 'bed_head_top', b: 'bed_feet_top', c: 'wool_colored_cyan', l: 'brick', p: 'portal', w: 'planks_big_oak'
 },
  music: 'Bed.wav',
  next: 'Lab',
  text: 'You are the brilliant Dr. Syphla. You have been ordered to test the new wormhole device. You were also told to be ready for anything, hence the gun.',
  parsedEnts: [],
};
rooms.Lab = {
  map: [
    'wwwwwwwwwwwwwwwwww   ooooooooooooooooo      jjppwwwwwwwwwwwwwwwwwwww',
    'wwwwwwwwwwwwwwwwww   oxxxxxxxxxxxxxxxo      jjpwwwwwwwwdwwwwwwwwwwww',
    'wwwwwwwlllwwwwwwwwssscxxxxxxxxxxxxxxxo      ppwwwwwwwggdggwwwwwwwwww',
    'wwwwwwwlilwwwwwwwwssscxxxxxxxxxxxooooo      wwwwwwwwwgeeegwwwwwwwwww',
    'wwwwwwwlllwwwwwwww   occccccccccoo      f   wwwwwwwwddebeddwwwwwwwww',
    'wwwwwwwwwwwwwwwwww   ooooooossoooo    f     wwwwwwwwwgeeegwwwwwwwwww',
    '                ss          ss              wwwwwwwwwggdggwwwwwwwwww',
    '                sssssssssssssssssssssssssssswwwwwwwwwwwdwwwwwwwwwwww',
    '                sssssssssssssssssssssssssssswwwwwwwwwwwwwwwwwwwwwwww',
  ],
  mapParsed: [],
  textureMap: { 
w: 'planks_jungle', o: 'iron_block', x: 'cobblestone', c: 'Caution', f: 'cactus_top', s: 'stonebrick_cracked', j: 'sponge_wet', l: 'brick', p: 'sponge', i: 'cauldron_inner', b: 'activate', d: 'diamond_block', g: 'gold_block', e: 'emerald_block' 
},
  music: 'Lab Room.wav',
  next: 'Outside',
  walls: ['8,3', '21,0', '21,1', '21,2', '21,3', '21,4', '21,5', '22,5', '23,5', '24,5', '25,5', '26,5', '27,5', '30,5'],
  text: 'This is your lab, where you make the most important discoveries. Go through the hallway to test it out.',
  onButtonPress() {
    this.advance();
  },
  parsedEnts: [],
};
rooms.Outside = {
  map: [
    'sssssssssssssssssss',
    'sssIssssssssssssscs',
    'sssssssssssssssssss',
    'ssssssssiiiiIssssss                                ddd',
    'sssssssiIsisissssss                                dpd',
    'scsssssiIiIisssssss                  wwwwwwwwww    ddd',
    'ssssssssiiisscsssss                  wwwwwwwwww',
    'sssscssssssssscssss                  wwwwwwwwww',
    'sssssssssssssssssss                  wwwwwwwwww',
    '        aac                          wwwwwwwwww',
    '        aaa                          wwwwwwwwww',
    '        caa                          wwwwwwwwww',
    '        acagacc                      wwwwwwwwww',
    '       caaIacagaagcacgacacacagccaccacwwwwwwwwww',
    '        aacg iicascccacaigcacacIgacacwwwwwwwwww',
  ],
  mapParsed: [],
  textureMap: { 
w: 'planks_birch', s: 'snow', a: 'stone_andesite', c: 'cobblestone', g: 'gravel', I: 'ice_packed', i: 'ice', d: 'diamond_block'
 },
  music: 'Dumdum.wav',
  next: 'a',
  text: 'Wha? What should have been a controlled experiment somehow got you in the middle of a barren tundra, even though you live in florida',
  entitys: ['100,100,enemies/Zombie', '150,100,enemies/Zombie', '200,100,enemies/Zombie', '100,150,enemies/Zombie'],
  parsedEnts: [],
};

let parseTextures = function (obj) {
  if (!obj.mapParsed.length) {
    for (let a in obj.map) {
      obj.mapParsed[a] = [];
      for (let b in obj.map[a]) {
        obj.mapParsed[a].push(obj.textureMap[obj.map[a][b]]);
      }
    }
  }
  return obj.mapParsed;
};
let parseEnt = function (obj) {
  if (obj.parsedEnts.length || !obj.entitys) {
    return;
  }
  obj.parsedEnts = obj.entitys.map((str) => {
    var arr = str.split(',');
    return {
      x: arr[0],
      y: arr[1],
      type: {
        group: arr[2].split('/')[0],
        texture: arr[2].split('/')[1]
      }
    };
  });
};

let API = {
  parse (obj) {
    parseTextures(obj);
    parseEnt(obj);
  },
  rooms,
};
export default API;
