import numpy as np
import pandas as pd
import nltk

df = pd.read_csv('D:/Uni_DUE/First_Semester/Learning Analytics/Project/full-dataset.csv')
df = df.drop('Unnamed: 0', 1)
print('Shape : ',df.shape)

top_tags = pd.read_csv("D:/Uni_DUE/First_Semester/Learning Analytics/Project/tags_counts.csv")
top_tags = top_tags['Tag'].head(500);
print(top_tags.shape)


mat_tag_df = pd.DataFrame(0,index = top_tags, columns=top_tags)
print(mat_tag_df.shape)
print(mat_tag_df.head(1))

for index, row in df.iterrows():
    tags = row['Tags'].split(',')
    for tag in tags :
        if tag in mat_tag_df.index:
            temps = tags.copy()
            temps.remove(tag)
            for temp in temps:
                if temp in mat_tag_df.index:
                    mat_tag_df.loc[tag] = mat_tag_df[temp] + 1
            
mat_tag_df.head(10)