var fruitObj = function()
{
		
		this.alive = [];//bool
		this.x = [];
		this.y = [];
		this.aneNO = [];
		this.l = [];
		this.spd = [];
		this.fruitType = [];
		this.orange = new Image();
		this.blue = new Image();
		this.green = new Image();
		this.colours = new Image();

}
fruitObj.prototype.num = 30;
fruitObj.prototype.init = function()
{
		for (var i = 0; i < this.num; i++)
		{
				
				this.alive[i] = true;
				this.x[i] = 0;
				this.y[i] = 0;
				this.aneNO[i] = 0;
				this.spd[i] = Math.random() * 0.017 + 0.003;//[0.003,0.02)
				this.fruitType[i] = "";
				// this.born(i);

		}
		this.orange.src = "./src/fruit.png";
		this.blue.src = "./src/blue.png";
		this.green.src = "./src/greenfruit.png";
		this.colours.src = "./src/caisefruit.png";

}
fruitObj.prototype.draw = function()
{
		for (var i = 0; i < this.num; i++)
		{

				//draw
				//find an ane, grow, fly up
				if(this.alive)
				{		
						if(this.fruitType[i] == "blue")
						{
								var pic = this.blue;
						}
						else if(this.fruitType[i] == "green")
						{
							 	var pic = this.green;
						}
						else if(this.fruitType[i] == "orange")
						{
								var pic = this.orange;
						}
						else
						{
								var pic = this.colours;
						}
						if (this.l[i] <= 14) 
						{
								var NO = this.aneNO[i];
								// console.log(NO);
								this.x[i] = ane.headX[NO];
								this.y[i] = ane.headY[NO];
								this.l[i] += this.spd[i] * deltaTime;
									
						}
						else
						{
								this.y[i] -= this.spd[i] * 7 * deltaTime;
						}
						ctx2.drawImage(pic, this.x[i] - this.l[i] * 0.5, this.y[i] - this.l[i] * 0.5, this.l[i], this.l[i]);
						if(this.y[i] < 10 || this.x[i] < 5 ||this.x[i] > canWidth)
						{
								this.alive[i] = false;
						}
				}
				
		}

}
fruitObj.prototype.born = function(i)
{
		this.aneNO[i] = Math.floor(Math.random() * ane.num);

		this.l[i] = 0;
		this.alive[i] = true;
		var ran = Math.random();
		if(ran < 0.15)
		{
				this.fruitType[i] = "blue";
		}
		else if(ran> 0.15 && ran < 0.6)
		{
				this.fruitType[i] = "orange";
		}
		else if(ran> 0.6 && ran < 0.95)
		{
				this.fruitType[i] = "green";
		}
		else
		{
				this.fruitType[i] = "colours";
		}
		
}
fruitObj.prototype.dead = function(i)
{
		this.alive[i] = false;
}
function fruitMonitor()
{		
		var num = 0;
		for(var i =0; i < fruit.num; i++)
		{
				if(fruit.alive[i]) num++;
		}
		if(num < 15)
		{
				sendFruit();
				//send fruit
				return
		}
}
function sendFruit()
{
		for (var i = 0; i < fruit.num; i++) 
		{
				if (!fruit.alive[i]) 
				{
						fruit.born(i);
						return;
				};
		}
}