import pandas as pd

def read_csv_file():
    
    movie_data = pd.read_csv('movies.csv')
    print("Content of the .csv file:")
    print(movie_data)


read_csv_file()