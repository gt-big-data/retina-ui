from mrjob.job import MRJob

class CategoryNeighbour():

    def mapper(self, _, line):
        user, category, count, _ = line.split("::")
        if count >= 3:
            yield user, (category, count)

    def reducer(self, user, categories):
        result = list(categories)
        yield user, result

    def steps(self):
        return [self.mr(mapper=self.mapper, reducer=self.reducer)]

if __name__ == '__main__':
    CategoryNeighbour.run()