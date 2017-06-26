library(shiny)
library(steveD3)
library(dplyr)

df <-
  dataframe %>%
  select (Requests..Site)

#gexf <- system.file("examples/ediaspora.gexf.xml", package = "sigma")
ui = shinyUI(fluidPage(
  selectInput("sites", "Select sites",
              sort(unique(df[['Requests..Site']])), selectize=TRUE,
              multiple = TRUE, selected = c('Amsterdam', 'Ankara')),

  steveD3Output('testsd'),

  DT::dataTableOutput('d1')
))

server = function(input, output) {

   output$testsd <- renderSteveD3({
     print ('send to steve')
     print (head (data_to_d3()))
     steveD3(message = data_to_d3())
 })


  data_to_d3 <- reactive ({
    df <- filter (df, Requests..Site %in% input$sites)
  })

  output$d1 <- DT::renderDataTable({
    DT::datatable(data_to_d3())
  })
}

shinyApp(ui = ui, server = server)



