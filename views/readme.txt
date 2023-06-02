<% if ( kindOfDay === " saturday" || kindOfDay === " sunday" ) { %> 
        <h1 style="color: purple"><%= kindOfDay %> ToDo List</h1>
    <% }else { %>
        <h1 style="color: blue"><%= kindOfDay %> ToDo List</h1>
    <% } %> 

    cmt :- "<%" will help to not the render the if else statement in the tempate of the website and only render the statement inside the if else



   if ( kindOfDay === " saturday" || kindOfDay === " sunday" ) {
        <h1 style="color: purple"><%= kindOfDay %> ToDo List</h1>
   }else {
        <h1 style="color: blue"><%= kindOfDay %> ToDo List</h1>
    } 
    
    cmt :- if this is done the it render the if else statement with the h1 tags colored as well