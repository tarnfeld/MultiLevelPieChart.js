MultiLevelPieChart.js
=====================

Extension chart for Chart.js for rendering nested or segmented pie charts. This is a useful graphic for rendering tree-like structures, for example disk usage on a file system. [View a demo](http://tarnfeld.github.io/MultiLevelPieChart.js/demo/).

![Example MultiLevelPieChart](demo/chart.png)

## Installing

You can install the extension using Bower with the following command.

```bash
$ bower install multilevelpiechart
```

## Example

The source of the [demo](http://tarnfeld.github.io/MultiLevelPieChart.js/demo/) serves as a good example of how you might use the chart, though here's some sample code to demonstrate how to instantiate one of these pie charts.

```js
(function(){
    var canvas = document.getElementById('demo'),
        ctx = canvas.getContext('2d');

    new Chart(ctx).MultiLevelPie([
        {
            label: "Foo",
            value: 10,
            children: [
                {
                    label: "A",
                    value: 4,
                    children: []
                },
                {
                    label: "B",
                    value: 6,
                    children: []
                }
            ]
        }
    ]);
}).call(this)
```
