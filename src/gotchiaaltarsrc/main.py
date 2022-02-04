# -*- coding: utf-8 -*-
"""
Created on Tue Jan 18 11:18:08 2022

Coding main script for raffle calculator website in an oop fashion

@author: berkz
"""

from utils.raffleCalculationImported import Ticket
import matplotlib.pyplot as plt
import dash
from dash import dcc
from dash import html
import plotly.graph_objects as go
from dash.dependencies import Input, Output

app = dash.Dash(__name__, suppress_callback_exceptions=True)
server = app.server

app.title = 'gotchiaaltar.com'

app.layout = html.Div(children=[html.H1('Welcome fren, may the VRF gods favor your odds'),
                                html.P('Select ticket type'),
                                html.Div(children=[dcc.Dropdown(
        id='ticketType-dropdown',
        options=[{'label': i, 'value': i} for i in ['Common', 'Uncommon', 'Rare', 'Legendary', 'Mythical', 'Godlike']], value = 'Common'),
                                html.P('Enter the number of tickets you have'), dcc.Input(id ='user-ticket', placeholder='Your Tickets', type='number', value=1000), html.P('Total Number of Entered Tickets'), 
                                dcc.Input(id='total-ticket', placeholder='Total Tickets', type='number', value=100000), dcc.Graph(id = 'distribution'), dcc.Textarea(id='odds', placeholder='Here are your odds', readOnly = 'readonly',style={'width': '30%', 'height': 100})
                                ])
    ])

@app.callback(
    Output('distribution', 'figure'),
    [Input('ticketType-dropdown','value'),
     Input('user-ticket','value'),
     Input('total-ticket','value')]
    )

def update_figure(ticketType, userTicket, totalTicket):
    ticket1 = Ticket(ticketType, userTicket, 0.06, totalTicket)
    Ticket.calculate_binomial_outcome(ticket1)
    Ticket.find_best_fit(ticket1)
    fig = go.Figure()
    fig.add_trace(go.Scatter(x=ticket1.binomialOutcome, y=ticket1.fit,
                    mode='markers', name='markers'))
    fig.update_xaxes(title_text="Number of Items")
    fig.update_yaxes(title_text="Probabilities")
    return fig

@app.callback(
    Output('odds', 'value'),
    [Input('ticketType-dropdown','value'),
     Input('user-ticket','value'),
     Input('total-ticket','value')]
    )

def find_odds(ticketType, userTicket, totalTicket):
    ticket1 = Ticket(ticketType, userTicket, 0.06, totalTicket)
    Ticket.calculate_binomial_outcome(ticket1)
    Ticket.find_best_fit(ticket1)
    odds = 'You are most likely to get {} items, with 68.26% probability to get between {} and {} items.\n'.format(int(ticket1.med), 
            ticket1.lownorm, ticket1.highnorm) + 'If you are lucky, with 13.56% probability you will get between {} and {} items.\n'.format(ticket1.highnorm, ticket1.lucky) + 'If you are unlucky, with 13.56% probability you will get between {} and {} items.\n'.format(ticket1.unlucky, ticket1.lownorm) + 'If you are very lucky, with %2.14 probability you will get between {} and {} items.\n'.format(ticket1.lucky, ticket1.vlucky) + 'If you are very unlucky, with %2.14 probability you will get between {} and {} items.\n'.format(ticket1.vunlucky, ticket1.unlucky) + """If you don't see any updates fren, chances are so smol you're NGMI."""
    return odds


if __name__ == '__main__':
    app.run_server(debug=True)






























