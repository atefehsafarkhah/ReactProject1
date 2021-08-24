class DatasetSummaryModel:
    def __init__(self, dsOverviewTable, dsCleandOverviewTable, tagFrequencyHighRes, 
                        tagFrequencyMedRes, tagFrequencyLowRes, barChartTagFreq, tagNumberToQuestionCoverage):
        self.DsOverviewTable = dsOverviewTable
        self.DsCleandOverviewTable = dsCleandOverviewTable
        self.TagFrequencyHighRes = tagFrequencyHighRes
        self.TagFrequencyMedRes = tagFrequencyMedRes
        self.TagFrequencyLowRes = tagFrequencyLowRes
        self.BarChartTagFreq = barChartTagFreq
        self.TagNumberToQuestionCoverage = tagNumberToQuestionCoverage



    


class DatasetOverViewTable:
    def __init__(self, columns, rows):
        self.Columns = columns
        self.Rows = rows


class Chart2D:
    def __init__(self, xAxis, yAxis):
        self.XAxis = xAxis
        self.YAxis = yAxis


class PredictionModel:
    def __init__(self, predictions, wholeTags):
        self.Predictions = predictions
        self.WholeTags = wholeTags 
