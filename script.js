const grid_container = document.querySelector(".grid_of_buttons");

const mines_element = document.getElementById('mines');
const timer_element = document.getElementById('timer');
const restart_element = document.getElementById("restart");

const ORIGINAL_number_of_bombs=40;
let number_of_bombs = 40;
let displayed_number_of_bombs = 40;

let grid_of_bombs = [];
let rows = 16;
let columns = 16;
let game_running = true;
for(let x=0;x<rows;x++)
{
  grid_of_bombs[x]=[];
  for(let y=0;y<columns;y++)
  {
    grid_of_bombs[x][y]= 0;
  }
}


while(number_of_bombs>0)
{
  let row = Math.floor(Math.random()*16);
  let column = Math.floor(Math.random()*16);
  if(grid_of_bombs[row][column] !== -1)
  {
    grid_of_bombs[row][column]= -1;
    number_of_bombs--;
  }
  else
  {
    console.log("failure");
  }
}

for(let x=0;x<rows;x++)
{
  for(let y=0;y<columns;y++)
  {
    if(grid_of_bombs[x][y] != -1)
    {
      let counter=0;
      for(let i=-1;i<=1;i++)
      {
        for(let k=-1;k<=1;k++)
        {
          if(x+i<rows && x+i>=0 && y+k<columns && y+k>=0 && grid_of_bombs[x+i][y+k] == -1)
          {
            counter++;
          }
        }
      }
      grid_of_bombs[x][y]=counter;
    }
  }
}
console.log(grid_of_bombs);

for(let x=0;x<16;x++)
{
  for(let y=0;y<16;y++)
  {
    const button = document.createElement("button");
    button.classList.add("grid_button");

    button.addEventListener('click',()=>
    {
      if(game_running==true)
      {
      click(button,x,y);
      }
    })

    button.addEventListener("contextmenu",function(event)
    {
      event.preventDefault();
      if(game_running==true)
      {
        if(!button.disabled && button.querySelector("img")==null)
        {
          const img = new Image(); 
          img.src = "minesweeper_logo.png";
          img.width=button.offsetWidth-6;
          img.height=button.offsetHeight-7;
          img.style.verticalAlign = "middle";
          button.innerHTML = '';
          button.appendChild(img);
          displayed_number_of_bombs--;
          if(displayed_number_of_bombs>=10)
          {
            mines_element.textContent=displayed_number_of_bombs;
          }
          else if(displayed_number_of_bombs<10 && displayed_number_of_bombs>=0)
          {
            mines_element.textContent="0"+displayed_number_of_bombs;
          }
          else
          {
            mines_element.textContent=displayed_number_of_bombs;
          }
          
        }
        else if(!button.disabled)
        {
          button.innerHTML ='';
          displayed_number_of_bombs++;
          if(displayed_number_of_bombs>=10)
          {
            mines_element.textContent=displayed_number_of_bombs;
          }
          else if(displayed_number_of_bombs<10 && displayed_number_of_bombs>=0)
          {
            mines_element.textContent="0"+displayed_number_of_bombs;
          }
          else
          {
            mines_element.textContent=displayed_number_of_bombs;
          }
        }
      }
    })
    
    grid_container.appendChild(button);
  }
}




function click(button,x,y)
{
  if(grid_of_bombs[x][y]>0 && button.querySelector('img') == null)
  {
    button.style.border = '1px solid black';
    button.style.fontWeight = 'bold';
    button.style.fontStretch = 'expanded';
    button.style.backgroundColor = "gray";
    if(grid_of_bombs[x][y] == 1)
      button.style.color="blue";
    if(grid_of_bombs[x][y] == 2)
      button.style.color="#23cf1d";
    if(grid_of_bombs[x][y] == 3)
      button.style.color="red";
    if(grid_of_bombs[x][y] == 4)
      button.style.color="purple";
    if(grid_of_bombs[x][y] >=5)
      button.style.color="orange";

    button.disabled=true;
    button.textContent=grid_of_bombs[x][y];
  }
  
  if(grid_of_bombs[x][y]==0 && !button.disabled && button.querySelector('img') == null)
  {
    button.style.border = '1px solid black';
    button.style.fontWeight = 'bold';
    button.style.backgroundColor = "gray";
    button.disabled=true;

    for(let i=-1;i<=1;i++)
    {
      for(let k=-1;k<=1;k++)
      {
        if(x+i<rows && x+i>=0 && y+k<columns && y+k>=0 && grid_of_bombs[x+i][y+k]>=0)
        {
          click(grid_container.children[(x+i)*columns+(y+k)],x+i,y+k);
        }
      }
    }
  }

  if(grid_of_bombs[x][y]==-1)
  {
    restart_element.textContent=":(";
    const mine_img = new Image();
    mine_img.src="mine.png";
    mine_img.width=button.offsetWidth-6;
    mine_img.height=button.offsetHeight-6;
    mine_img.style.verticalAlign = "middle";
    button.innerHTML ='';
    button.appendChild(mine_img);
    console.log("LOST");
    game_running = false;
  }
  
}

let time = 0;

function increment_time()
{
  if(game_running==true)
  {
  time++;
  if(time<10)
  {
    timer_element.textContent="00"+time;
  }
  else if(time>=10 && time<100)
  {
    timer_element.textContent="0"+time;
  }
  else if(time>=100 && time<1000)
  {
    timer_element.textContent=time;
  }
  else
  {
    timer_element.textContent=999;
  }
  }
}

setInterval(increment_time,1000);










