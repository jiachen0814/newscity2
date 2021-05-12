var input, button, greeting,record;
var fade1,fade2,fade3,fade4,fade5;
var fadeAmount1 = 1;
var fadeAmount2 = 1;
var fadeAmount3 = 1;
var fadeAmount4 = 1;
var fadeAmount5 = 1;
var width_random=0;
var height_random=0;


var url1 = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=';
var url2_1 =
  '&api-key=kui5leNuS9yHDWZY8Tx2kZUQSZDMzAhy';
var url2_2 = '&fq=news_desk:("Sports")&api-key=kui5leNuS9yHDWZY8Tx2kZUQSZDMzAhy';
var url2_3='&fq=news_desk:("Science")&api-key=kui5leNuS9yHDWZY8Tx2kZUQSZDMzAhy'; 
var url2_4='&fq=news_desk:("Business")&api-key=kui5leNuS9yHDWZY8Tx2kZUQSZDMzAhy'; 
var url2_5='&fq=news_desk:("Politics")&api-key=kui5leNuS9yHDWZY8Tx2kZUQSZDMzAhy'; 
var url2_6='&fq=news_desk:("Culture")&api-key=kui5leNuS9yHDWZY8Tx2kZUQSZDMzAhy';
var width_text_sports=[];//remember the location of the text
var height_text_sports=[];
var width_text_science=[];
var height_text_science=[];
var width_text_business=[];
var height_text_business=[];
var width_text_politics=[];
var height_text_politics=[];
var width_text_culture=[];
var height_text_culture=[];
var width_text_trash=[];
var height_text_trash=[];
let f=[];
var input_1;//input
var sports2=[];//array that record the number of articles
var science2=[];
var business2=[];
var politics2=[];
var culture2=[];
var sports1=0;//record the number of articles ( current )
var science1=0;
var business1=0;
var politics1=0;
var culture1=0;
var sports_input=[];//record the input of the text
var science_input=[];
var business_input=[];
var politics_input=[];
var culture_input=[];
var trash_input=[];
var flag=-1;//different buttons differen flag - different url
var sports1_total=0;
var science1_total=0;
var business1_total=0;
var politics1_total=0;
var culture1_total=0;
var trash_flag=0;

var word='-1';
var link;

function setup() {
    fade1=0;//different fading speed for different categories 
    fade2=20;
    fade3=50;
    fade4=80;
    fade5=120;

    //input
    input = createInput();
    input.position(windowWidth/2-140, windowHeight/2);//center
    input.style('width','285px');
    input.style('height','20px');
    input.style('font-family','Monospace');
    input.style('font-size','15px');
 
    //button sports
    button = createImg('https://cdn.rawgit.com/jiachen0814/newscity/main/sports.JPG');
    button.style('border-top-left-radius', '0.5em');
    button.style('border-top-right-radius', '0.5em');
    button.style('border-bottom-left-radius', '0.5em');
    button.style('border-bottom-right-radius', '0.5em');
    button.style('height','50px');
    button.style('width','50px');
    button.position(windowWidth/2-140, windowHeight/2+50);
    button.mousePressed(sports);

    //button science
    button = createImg('https://cdn.rawgit.com/jiachen0814/newscity/main/science.JPG');
    button.position(windowWidth/2-80, windowHeight/2+50);
    button.mousePressed(science);
    button.style('border-top-left-radius', '0.5em');
    button.style('border-top-right-radius', '0.5em');
    button.style('border-bottom-left-radius', '0.5em');
    button.style('border-bottom-right-radius', '0.5em');
    button.style('height','50px');
    button.style('width','50px');
  
    //button business
    button = createImg('https://cdn.rawgit.com/jiachen0814/newscity/main/business.JPG');
    button.position(windowWidth/2-20, windowHeight/2+50);
    button.mousePressed(business);
    button.style('border-top-left-radius', '0.5em');
    button.style('border-top-right-radius', '0.5em');
    button.style('border-bottom-left-radius', '0.5em');
    button.style('border-bottom-right-radius', '0.5em');
    button.style('height','50px');
    button.style('width','50px');
  
    //button politics
    button = createImg('https://cdn.rawgit.com/jiachen0814/newscity/main/politics.JPG');
    button.position(windowWidth/2+40, windowHeight/2+50);
    button.mousePressed(politics);
    button.style('border-top-left-radius', '0.5em');
    button.style('border-top-right-radius', '0.5em');
    button.style('border-bottom-left-radius', '0.5em');
    button.style('border-bottom-right-radius', '0.5em');
    button.style('height','50px');
    button.style('width','50px');
  
    //button culture
    button = createImg('https://cdn.rawgit.com/jiachen0814/newscity/main/culture.JPG');
    button.position(windowWidth/2+100, windowHeight/2+50);
    button.mousePressed(culture);
    button.style('border-top-left-radius', '0.5em');
    button.style('border-top-right-radius', '0.5em');
    button.style('border-bottom-left-radius', '0.5em');
    button.style('border-bottom-right-radius', '0.5em');
    button.style('height','50px');
    button.style('width','50px');
  
    //label: enter a word & submit again
    greeting = createElement('a','enter a word');
    greeting.position(windowWidth/2-105, windowHeight/2-50);
    greeting.style('font-size','30px');
    greeting.style('color','white');
    greeting.style('font-family','Monospace');
  
    createCanvas(windowWidth, windowHeight); 
}

function draw(){
    print(word);
    textSize(10);

    /* DIAGRAM & BACKGROUND COLOR */
    let m1,m2,m3,m4,m5;
    //total data of 5 categories
    var total_data=sports1_total+science1_total+business1_total+politics1_total+culture1_total;
    print("total_data"+total_data);
    //map the value to 0-100 (percentage)
    if(sports1_total==-1)m1=0;//if no input yet
    else m1 = int(map(sports1_total, 0, total_data, 0, 100));
    if(science1_total==-1)m2=0;
    else m2 = int(map(science1_total, 0, total_data, 0, 100));
    if(business1_total==-1)m3=0;
    else m3 = int(map(business1_total, 0, total_data, 0, 100));
    if(politics1_total==-1)m4=0;
    else m4 = int(map(politics1_total, 0, total_data, 0, 100));
    if(culture1_total==-1)m5=0;
    else m5 = int(map(culture1_total, 0, total_data, 0, 100));

    /* START OF THE GAME */
    //if 5 categories all no input(start of the game)
    if(total_data==0)
    {
        background(80,80,80);
        fill(155,155,155,50);
        rect(0,0,width,height);
    }
    else{
        //background color change: mean color
        background((m1*242+m2*129+m3*95+m4*164+m5*233)/(m1+m2+m3+m4+m5),(m1*82+m2*203+m3*147+m4*126+m5*210)/(m1+m2+m3+m4+m5),(m1*61+m2*117+m3*232+m4*194+m5*129)/(m1+m2+m3+m4+m5));
        fill(0,0,0,150);//draw dark rectangle to make the text more invisible
        rect(0,0,width,height);
    }
    //rectangle behind (the panel)
    fill(155,155,155,50);
    stroke(155,155,155,50);
    rect(windowWidth/2-195, windowHeight/2-80,400,200,10);

    //diagram
    fill(242,82,61);
    rect(windowWidth/2-140,windowHeight-550-m1,50,m1);
  
    fill(129,203,117);    
    rect(windowWidth/2-80,windowHeight-550-m2,50,m2);
  
    fill(95,147,232);
    rect(windowWidth/2-20,windowHeight-550-m3,50,m3);
  
    fill(164,126,194);
    rect(windowWidth/2+40,windowHeight-550-m4,50,m4);
  
    fill(233,210,129);
    rect(windowWidth/2+100,windowHeight-550-m5,50,m5);
  
    /* Data from NY Times */
    textSize(10);
    textFont('Monospace');
    fill(255);
    text("* Data from NY Times",windowWidth/2-58, windowHeight/2+140);
  
    /* DISPLAY THE TEXT */
    if (fade1<0) fadeAmount1=3; 
    if (fade1>255) fadeAmount1=-10; 
    fade1 += fadeAmount1; 
  
    if (fade2<0) fadeAmount2=3; 
    if (fade2>255) fadeAmount2=-10; 
    fade2 += fadeAmount2; 
  
    if (fade3<0) fadeAmount3=3; 
    if (fade3>255) fadeAmount3=-10; 
    fade3 += fadeAmount3; 
  
    if (fade4<0) fadeAmount4=3; 
    if (fade4>255) fadeAmount4=-10; 
    fade4 += fadeAmount4; 
  
    if (fade5<0) fadeAmount5=3; 
    if (fade5>255) fadeAmount5=-10; 
    fade5 += fadeAmount5; 
  
    //size of the text & display
    for(let i=0;i<sports2.length;i++)
    {
        //define the smallest text
        if((sports2[i]/500)<2){
            sports2[i]=1000;
        }
        //define the biggest text
        else if((sports2[i]/500)>100)
        {
            sports2[i]=50000;
        }
        //display the text
        textSize(sports2[i]/500);
        textFont('Monospace');
        fill(242,82,61,fade1);
        text(sports_input[i],width_text_sports[i],height_text_sports[i]);
    }
    for(let i=0;i<science2.length;i++)
    {
        if((science2[i]/500)<2){
            science2[i]=1000;
        }
        else if((science2[i]/500)>100)
        {
            science2[i]=50000;
        }
        textSize(science2[i]/500);
        textFont('Monospace');
        fill(129,203,117,fade2);
        text(science_input[i],width_text_science[i],height_text_science[i]);
    }
    for(let i=0;i<business2.length;i++)
    {
        if((business2[i]/500)<2){
        business2[i]=1000;
        }
        else if((business2[i]/500)>100)
        {
            business2[i]=50000;
        }
        textSize(business2[i]/500);
        fill(95,147,232,fade3);
        textFont('Monospace');
        text(business_input[i],width_text_business[i],height_text_business[i]);
    }
    for(let i=0;i<politics2.length;i++)
    {
        fill(164,126,194,fade4);
        if((politics2[i]/500)<2){
            politics2[i]=1000;
        }
        else if((politics2[i]/500)>100)
        {
            politics2[i]=50000;
        }
        textSize(politics2[i]/500);
        textFont('Monospace');
        text(politics_input[i],width_text_politics[i],height_text_politics[i]);
    }
    for(let i=0;i<culture2.length;i++)
    {
        if((culture2[i]/500)<2){
            culture2[i]=1000;
        }
        else if((culture2[i]/500)>100)
        {
            culture2[i]=50000;
        }
        textSize(culture2[i]/500);
        textFont('Monospace');
        fill(233,210,129,fade5);
        text(culture_input[i],width_text_culture[i],height_text_culture[i]);
    }
    //trash
    for(let i=0;i<trash_input.length;i++)
    {
        textSize(10);
        textFont('Monospace');
        fill(113,113,113);
        text(trash_input[i],width_text_trash[i],height_text_trash[i]);
    }
    sport1=0;
    science1=0;
    business1=0;
    politics1=0;
    culture1=0;
}

//button function
function sports() {
  flag=1;
  input_1=input.value();
  loadJSON(url1 + input.value() + url2_2, gotData);
}
function science() {
  flag=2;
  input_1=input.value();
  loadJSON(url1 + input.value() + url2_3, gotData);
}
function business() {
  flag=3;
  input_1=input.value();
  loadJSON(url1 + input.value() + url2_4, gotData);
}
function politics() {
  flag=4;
  input_1=input.value();
  loadJSON(url1 + input.value() + url2_5, gotData);
}
function culture() {
  flag=5;
  input_1=input.value();
  loadJSON(url1 + input.value() + url2_6, gotData);
}

// callback function processes data  
function gotData(data) {
    word = data.response.meta.hits;
    //fill(255);
    print("flag"+flag);
    //print(textWidth(input_1));
    if(int(word)!=0)//if not trash
    {
        trash_flag=0;
        if(flag==1)//sports
        {
            sports1=int(word);//sport1: number of articles
            append(sports2,sports1);//sports2: array
            append(sports_input,input_1);//sports_input: array of input
            width_random=random(20,windowWidth-100);//cannot be outside of right edge too much
            height_random=random(20,windowHeight);
        //if overlap with the center panel
        for(;(width_random+textWidth(input_1)>windowWidth/2-230)&&(width_random<windowWidth/2+240)&&(height_random>windowHeight/2-200)&&(height_random<windowHeight/2+200);)
        {
            width_random=random(20,windowWidth-100);
        }
        append(width_text_sports,width_random);
        append(height_text_sports,height_random);
        sports1_total+=sports1;//add to the total
       }
        if(flag==2)
        {
            science1=int(word);
            //print(science1);
            append(science2,science1);
            append(science_input,input_1);
            width_random=random(20,windowWidth-100);
            height_random=random(20,windowHeight);
            for(;(width_random+textWidth(input_1)>windowWidth/2-230)&&(width_random<windowWidth/2+240)&&(height_random>windowHeight/2-200)&&(height_random<windowHeight/2+200);)
            {
                width_random=random(20,windowWidth-100);
            }
            append(width_text_science,width_random);
            append(height_text_science,height_random);
            science1_total+=science1;
            //for(let i=0;i<science2.length;i++)science1_total+=science2[i];
        }
        if(flag==3)
        {
            business1=int(word);
            //print(business1);
            append(business2,business1);
            append(business_input,input_1);
            width_random=random(20,windowWidth-100);
            height_random=random(20,windowHeight);
            for(;(width_random+textWidth(input_1)>windowWidth/2-230)&&(width_random<windowWidth/2+240)&&(height_random>windowHeight/2-200)&&(height_random<windowHeight/2+200);)
            {
                width_random=random(20,windowWidth-100);
            }
            append(width_text_business,width_random);
            append(height_text_business,height_random);
            business1_total+=business1;
            //for(let i=0;i<business2.length;i++)business1_total+=business2[i];
            }
        if(flag==4)
        {
            politics1=int(word);
            //print(politics1);
            append(politics2,politics1);
            append(politics_input,input_1);
            width_random=random(20,windowWidth-100);
            height_random=random(20,windowHeight);
            for(;(width_random+textWidth(input_1)>windowWidth/2-230)&&(width_random<windowWidth/2+240)&&(height_random>windowHeight/2-200)&&(height_random<windowHeight/2+200);)
            {
                width_random=random(20,windowWidth-100);
            }
            append(width_text_politics,width_random);
        append(height_text_politics,height_random);
            politics1_total+=politics1;
            //for(let i=0;i<politics2.length;i++)politics1_total+=politics2[i]
        }
        if(flag==5)
        {
            culture1=int(word);
            //print(culture1);
            append(culture2,culture1);
            append(culture_input,input_1);
            width_random=random(20,windowWidth-100);
            height_random=random(20,windowHeight);
            for(;(width_random+textWidth(input_1)>windowWidth/2-230)&&(width_random<windowWidth/2+240)&&(height_random>windowHeight/2-200)&&(height_random<windowHeight/2+200);)
            {
                width_random=random(20,windowWidth-100);
            }
            append(width_text_culture,width_random);
            append(height_text_culture,height_random);
            culture1_total+=culture1;
            //for(let i=0;i<culture2.length;i++)culture1_total+=culture2[i];
        }
    }
    //if is trash
    else
    {
        trash_flag=1;
        append(trash_input,input_1);
        width_random=random(20,windowWidth-100);
        height_random=random(20,windowHeight);
        for(;(width_random+textWidth(input_1)>windowWidth/2-230)&&(width_random<windowWidth/2+240)&&(height_random>windowHeight/2-200)&&(height_random<windowHeight/2+200);)
        {
            width_random=random(20,windowWidth-100);
        }
        append(width_text_trash,width_random);
        append(height_text_trash,height_random);
    }
    greeting.html("submit again");
}
