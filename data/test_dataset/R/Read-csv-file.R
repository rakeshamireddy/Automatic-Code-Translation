read_csv_file <- function() {
movie_data = read.csv(file="movies.csv", header=TRUE, sep=",")
print("Content of the .csv file:")
print(movie_data)
}

read_csv_file()
