let symbolSize = 24;
let streams = [];
let firstStream;
let style = 0;

function setup() {
    createCanvas(window.innerWidth, window.innerHeight)
    let x = 0;
    let y = 0;
    for (let i = 0; i < width / symbolSize; i++){
        let stream = new Stream();
        stream.generateSymbols(x, random(-height*2,0));    
        streams.push(stream);
        x += symbolSize;
        if (random(1) === 0) {
            stream.generateSymbols(x - symbolSize / 2, random(-height, 0));
        }
        
    }

    firstStream = new Stream();
    firstStream.speed = 5;
    firstStream.generateSymbols(width / 2, -height / 2);


    textFont('cursive')
    textSize(symbolSize);
}

let arbY = 0;
let stopped = 0;
function keyTyped() {
    if (stopped) {
        stopped = 0;
        loop()
    } else {
        stopped = 1;
        noLoop();
    }
}

function mousePressed() {
    style++;
    if (style === 10) style = 0;
    for (let i = 0; i < streams.length; i++){
        streams[i].symbols.forEach((e) => {
            e.setToRandomSymbol(style);
        })
    }


}
function draw() {
    console.log(stopped)
    frameRate(50)
    background(0,250);
    firstStream.render(true);
    if (firstStream.symbols[0].y >= height*2) {
        firstStream.y = height*2
    }
    firstStream.symbols.map(e => {
        e.y += 7;
    });
    arbY += 10;
    if (firstStream.symbols[0].y >= height*2/3) {
        streams.forEach((stream) => {
            stream.render(false);
        })
    }
}


function Stream() {
    this.symbols = [];
    this.totalSymbols = round(random(7, 15));
    this.speed = random(7,18);

    this.generateSymbols = function (x,y) {
        let first = true;
        for (let i = 0; i < this.totalSymbols; i++){
            let symbol = new Ssymbol(x, y, this.speed);
            symbol.setToRandomSymbol(style);
            if(first) symbol.first = true;
            this.symbols.push(symbol);
            y -= symbolSize;
            first = false;
        }

    }

    this.render = function (first) {
        let idx = 0;
        let rnd1 = random(255)
        let rnd2 = random(255)
        let rnd3 = random(255)
        
        this.symbols.forEach(function (symbol) {
            idx++;
            if (symbol.first) {
                if (style === 9) {
                    stroke(255, 50)
                    fill(color(rnd1,rnd2, rnd3));
                }
                else if (style === 8) {
                    stroke(255, 50)
                    fill(color(255,255, 255));
                }
                else if (style === 7) {
                    stroke(255, 50)
                    fill(color(255,0, 0));
                
                }
                else if (style === 6) {
                    stroke(255, 50)
                    fill(color(0,200, 200));
                
                }
                else if (style === 5) {
                    stroke(255, 50)
                    fill(color(200,0, 200));
                
                }
                else {
                    stroke(255, 50)
                    fill(color(0, 255, 70));
                }
            } 
            else {
                if (style === 9) {
                    noStroke();
                    fill(color(rnd1, rnd2, rnd3,500-idx*50));
                }
                else if (style === 8) {
                    noStroke();
                    fill(color(255,255, 255,500-idx*50));
                }
                else if (style === 7) {
                    noStroke();
                    fill(color(255,0, 0,500-idx*50));
                
                }
                else if (style === 6) {
                    noStroke();
                    fill(color(0,200, 200,500-idx*50));
                
                }
                else if (style === 5) {
                    noStroke();
                    fill(color(200,0, 200,500-idx*50));
                
                }
                else {
                    noStroke();
                    fill(color(0, random(200,220), 70,500-idx*50));
                }
            }
            text(symbol.value, symbol.x, symbol.y);
            if (!first) {
                symbol.rain();
            } 
            symbol.setToRandomSymbol(style);
        })
    }

    this.delete = function () {
        this.symbols = [new Ssymbol()];
    }
    
    

}


function Ssymbol(x,y,speed,first) {
    this.x = x;
    this.y = y;
    this.value;
    this.speed = speed;
    this.switchInterval = round(random(1,50));
    this.first = first;

    this.setToRandomSymbol = function (sty) {
        
        if (frameCount % this.switchInterval === 0) {
            if (sty%5 === 0) {
                //kor
                this.value = String.fromCharCode(
                    0x1100 + round(random(0, 19))
                );
            } else if (sty%5 === 1) {
                //jap
                this.value = String.fromCharCode(
                    0x30A0 + round(random(0,96))
                );
            } else if (sty%5 === 2) {
                //eng
                this.value = String.fromCharCode(
                    0x0041 + round(random(0,42))
                );
            } else if (sty%5 === 3) {
                //chineses
                this.value = String.fromCharCode(
                    0x3400 + round(random(0,5000))
                );
            }else if (sty%5 === 4) {
                //arbitary
                this.value = String.fromCharCode(
                    0x1100 + round(random(0,5000))
                );
            }
        }
    }
    
    this.rain = function () {
        this.y = this.y >= height ? 0 : this.y += this.speed;
    }
}


