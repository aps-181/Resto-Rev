# def matrixReshape(mat, r, c):
#     ro = len(mat)
#     co = len(mat[0])
#     ri = 0
#     ci = 0
#     if co*ro != r*c:
#         return mat
#     rowi = []
#     rmat = []
#     for row in mat:
#         for x in row:
#             rowi.append(x)
#             ci += 1
#             if ci == c:
#                 ci = 0
#                 rmat.append(rowi)
#                 rowi.clear()

#     return rmat

mat = [[1, 2], [3, 4]]

# temp list to store temporary data for reshape
temp = list()
# res list to store result data for final product of reshape
res = list()
# to check if we reach the number of column per loop run
counter = 0

for i in range(len(mat)):
    for j in range(len(mat[0])):
        temp.append(mat[i][j])
        counter += 1
        if counter == 4:
            res.append(temp)
            # temp = list()  # reset the temp list for new data
            temp.clear()
            counter = 0  # reset counter for another loop-run


# rmat = matrixReshape(mat, 1, 4)
print(res)
