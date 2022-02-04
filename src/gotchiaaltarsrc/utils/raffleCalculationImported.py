# -*- coding: utf-8 -*-
"""
Created on Tue Jan 18 13:20:00 2022

Coding main script for raffle calculator website in an oop fashion

@author: zerk
"""

import numpy as np
import matplotlib.pyplot as plt
from scipy.stats import norm

class Ticket:
    #Class attributes are defined, fixed supply of items and template for instances of the created class
    #Here I create a dictionary for available type of items and their supply number which can be adjusted for different raffles
    supply = {'Common': 5000, 'Uncommon': 2000, 'Rare':1000,
              'Legendary': 400, 'Mythical':200, 'Godlike': 15}
    all = []
    fig, ax = plt.subplots()
    #Magic method of init to assign attributes by default to any object created in the class, price not utilized but can be implemented for ROI calculations
    def __init__(self, type: str, quantity: int, price: float, totalEntry: float):
        #Validate the values passed on using statements
        assert price >= 0, f'Price of a ticket must be bigger than zero'
        assert quantity >= 0, f'You can only enter with positive quantity'
        assert type in Ticket.supply, 'Enter an available type of ticket {}'.format(Ticket.supply.keys())
        assert totalEntry >= 0, f'Total entry number of tickets must be bigger than zero'
        
        #Assign to self object allowing user defined attributes directly while initiating the object
        self.type = type #Type of the ticket
        self.quantity = quantity #Number of tickets user owns
        self.price = price #Average price of tickets
        self.totalEntry = totalEntry #Total number of tickets in the pool
        
        #Actions to execute, first line to keep track of all created objects
        Ticket.all.append(self)
        
    def calculate_entry_cost(self):
        return self.quantity * self.price # Function for determining cost of entry to raffle
    
    def calculate_probability(self):
        return self.supply[self.type] / self.totalEntry # Probability to get an item on one instance
    
    def calculate_binomial_outcome(self):
        self.binsize = np.int(1 + 3.322*np.log(self.quantity)) # Sturge's rule used for determining bin size
        self.binomialOutcome = np.random.binomial(self.quantity, Ticket.calculate_probability(self), size=self.quantity) # Using binomial function for results
        self.weight = np.ones_like(self.binomialOutcome)/len(self.binomialOutcome)*100 # For showing y axis as probabilities, not as frequency/counts
        return self.binomialOutcome
    
    def find_best_fit(self): # To fit a function to histogram
        self.bins = self.ax.hist(self.binomialOutcome) # edges of bins for plotting in e.g matplotlib
        self.med = np.median(self.binomialOutcome) # median
        self.mean = np.mean(self.binomialOutcome) # mean
        self.sigma = np.std(self.binomialOutcome) # standard deviation
        self.fit = norm.pdf(self.binomialOutcome, self.mean, self.sigma)*100 #fitting function multiplied by 100 for percentage probability
        self.xlim = np.arange(0, self.binomialOutcome.max()+1, step = np.round(self.sigma)) # limiting range
        self.lownorm = int(np.round(self.med - self.sigma)) # Lower bound of first sigma, can't be negative items so set to zero
        if self.lownorm < 0:
            self.lownorm = 0
        self.highnorm = int(np.round(self.med + self.sigma)) # Higher bound of first sigma
        self.lucky = int(np.round(self.med + 2 * self.sigma)) # Higher bound of 2*sigma
        self.unlucky = int(np.round(self.med - 2 * self.sigma)) # Lower bound of 2*sigma
        if self.unlucky < 0:
            self.unlucky = 0
        self.vlucky = int(np.round(self.med + 3 * self.sigma)) # Higher bound of 3*sigma
        self.vunlucky = int(np.round(self.med - 3 * self.sigma)) # Lower bound of 3*sigma
        if self.vunlucky < 0:
            self.vunlucky = 0
    
    def __repr__(self): # template for created objects if needed
        return 'Ticket({}, {}, {}, {})'.format(self.type, self.quantity, self.price, self.totalEntry)
