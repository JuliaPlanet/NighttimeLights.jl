add_dim(x) = reshape(x, (size(x)[1:2]...,1,size(x)[3]))