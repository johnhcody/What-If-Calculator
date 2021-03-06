# What-If-Calculator

[Live Version](https://johnhcody.github.io/What-If-Calculator/)

### To Use this Application:

 - Navigate to the Live Link
   - Step 1: Select one or more habits (Or input your daily, weekly, or monthly habits)
   - Step 2: Input an interest rate 
   - Step 3: Input the number of years you would like to caclulate
   - Step 4: Click "Create Graph"
 - Click "Reset" and do it again!

 
 ### Demo:
 


![what-if-demo.gif](https://github.com/johnhcody/What-If-Calculator/blob/master/src/images/what-if-demo.gif?raw=true)

  
### Finding the accrual:

This was the first step in building the application.  Having an algorithm that was accurate with various inputs and could create data in a way that was readable for the D3.js graph proved to be challenging.  The method takes in a habit and a contribution.  The contribution is a pre-determined value (the explanation of how each value was found can be found below), and the return value is a new key in the object that will be sent to the Graph Object.  The key has a value of the accrual that is specific to the contribution, the rate, and the amount of time. 
 
 
 ``` findAccrual(habit, contribution) {
        let decimalRate = (this.rate / 100) + 1;
        let i = 0;
        let accrual = 0;
        while (i < this.year) {
            if (i === 0) {
                accrual = (contribution * decimalRate)
             } else {
                 accrual = ((contribution * decimalRate) + (accrual * decimalRate));
            }
            i += 1;
        }
        return this[habit] = parseInt(accrual);
    } 
 ```
    
 
### Technologies Implemented:

 - D3.js
 - Javascript
 - SCSS
 


### How I calculated the cost of each habit (with Links to Sources):  

- [Coffee: $427/yr](https://www.lazymanandmoney.com/brewing-coffee-home-vs-coffee-shop/?__cf_chl_jschl_tk__=534737c37e8ed1ded59d739a9533f104514214a7-1602876220-0-AQUVHkdfxC0GoteiBoqA73mhPuZ4BaAMn_sVK-vpBZ5E7u7jbyU-LSvAw50CHzQiAjoQ65nGeiBuUqDHgjxoF0B1mp15dNii9-TzPguCL-gQE4bnmoflLLBP-_kUwQBkRom_ax3jraCzQZX17ayI-VXwRCrAwYqDkyzh8pvfkH3UfpJe9fB6P82yLTiFBtuLxeDZEHRkNx84etrOyjIFnNoJkZJgw2_TSGYWXLPxlBE4tfuMscYKSuz8zLiezCvDtqipciGkbjGKT_rgPzQYUt3sh61DblmyWayzdnmGwws6kGcI0QuERaDc0DMjLMvoh9NWy5dbwgaZb-gn5Gna1Ww-DEnRa7CTsE4pnqBbAp4c4v8Mp3SfngbTkn-9fqurVg)
- [Haircuts: ((Average Male Haircut Cost + Average Female Haircut Cost) / 2) - ($20/year for a haircutting kit) = $112/yr](https://towardsdatascience.com/analyzing-who-spends-more-on-haircuts-men-or-women-a90003e98312)
- [Packing a Lunch: $1200/yr](https://www.makingsenseofcents.com/2017/11/does-bringing-lunch-to-work-actually-save-money.html#:~:text=But,%20bringing%20lunch%20to%20work,know%20what%20you%20are%20doing.&text=Just%20like%20the%20cost%20of,of%20bringing%20it%20from%20home.) 
- [Replacing Cable with Streaming: (Average Cable Package - $20/mo Streaming Service) = $2,369/yr](https://decisiondata.org/news/report-the-average-cable-bill-now-exceeds-all-other-household-utility-bills-combined/)
- [Biking to Work: $1000/yr](https://www.cnbc.com/2018/05/18/biking-to-work-could-save-you-over-1000-a-year.html)
- [Buying Generic Brands: ($20/week x 52 weeks/yr) = $1040/yr](https://www.daveramsey.com/blog/buying-generic-groceries-saves-money)



 

