function z = angle(Vn,input)
    k = input(1);
    m = input(2);
    n = input(3);
    rho = input(4);
    x = Vn(:,m)-Vn(:,k);
    y = Vn(:,n)-Vn(:,k);
    z = dot(x,y)/norm(x)/norm(y);
    if z>=1
        z=1;
    end
    z = abs(2*pi/rho-acos(z));    
end