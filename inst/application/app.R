library(shiny)
library(steveD3)

#gexf <- system.file("examples/ediaspora.gexf.xml", package = "sigma")

ui = shinyUI(fluidPage(
  checkboxInput("drawEdges", "Draw Edges", value = TRUE),
  checkboxInput("drawNodes", "Draw Nodes", value = TRUE),
  textInput("mytext", "Add text "),
  steveD3Output('test')


))



server = function(input, output) {

  output$test <- renderSteveD3({
    steveD3(message= dataframe)
  })
}

shinyApp(ui = ui, server = server)


#HTMLWidgets.dataframeToD3(x.message);
