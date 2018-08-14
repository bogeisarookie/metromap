function y = objectFunc(Vn, V, D)
    
    Vnx = Vn(1:length(V(1,:)));
    Vny = Vn(length(V(1,:))+1:2*length(V(1,:)));
    
    Line1n = [Vnx(1:16);Vny(1:16)];
    Line2n = [Vnx(5) Vnx(17:24) Vnx(12:13) Vnx(25:27);... 
             Vny(5) Vny(17:24) Vny(12:13) Vny(25:27)];
    Line3n = [Vnx(28:30) Vnx(7) Vnx(31:32) Vnx(22) Vnx(33:39); ...
             Vny(28:30) Vny(7) Vny(31:32) Vny(22) Vny(33:39)];
    Line4n = [Vnx(20) Vnx(40:44);Vny(20) Vny(40:44)];

%   Angular Resolution Criterion below
    c_N1 = 0;
    angle2 = @(x)angle([Vnx;Vny],x);
    c_N1 = c_N1+angle2([5,4,6,3])+angle2([5,4,17,3])+angle2([5,6,17,3]);
    c_N1 = c_N1+angle2([7,6,30,4])+angle2([7,8,30,4])+ ... 
           angle2([7,6,31,4])+angle2([7,8,31,4]);
    c_N1 = c_N1+angle2([12,11,13,3])+angle2([12,24,13,3])+...
           angle2([12,11,24,3]);
    c_N1 = c_N1+angle2([13,12,14,3])+angle2([13,26,14,3])+...
           angle2([13,12,26,3]);
    c_N1 = c_N1+angle2([20,19,40,3])+angle2([20,19,21,3])+...
           angle2([20,21,40,3]);
    c_N1 = c_N1+angle2([22,21,32,4])+angle2([22,21,33,4])+...
           angle2([22,23,32,4])+angle2([22,23,33,4]);
       
%   Edge Length Criterion
    c_N2 = 0;
    for k = 2:length(Line1n)
        c_N2 = c_N2+abs(norm(Line1n(:,k)-Line1n(:,k-1))/D-1);
    end
    for k = 2:length(Line2n)
        c_N2 = c_N2+abs(norm(Line2n(:,k)-Line2n(:,k-1))/D-1);
    end
    for k = 2:length(Line3n)
        c_N2 = c_N2+abs(norm(Line3n(:,k)-Line3n(:,k-1))/D-1);
    end
    for k = 2:length(Line4n)
        c_N2 = c_N2+abs(norm(Line4n(:,k)-Line4n(:,k-1))/D-1);
    end
    % Mind that some edges may be added twice, for example 12-13
    
% Line Straightness Criterion
    c_N4 = 0;
    for k = 2:length(Line1n)-1
        t1 = Line1n(:,k)-Line1n(:,k-1);
        t2 = Line1n(:,k+1)-Line1n(:,k);
        sigma = dot(t1,t2)/norm(t1)/norm(t2);
        if sigma >= 1
            sigma = 1;
        end
        c_N4 = c_N4+acos(sigma);
    end
    for k = 2:length(Line2n)-1
        t1 = Line2n(:,k)-Line2n(:,k-1);
        t2 = Line2n(:,k+1)-Line2n(:,k);
        sigma = dot(t1,t2)/norm(t1)/norm(t2);
        if sigma >= 1
            sigma = 1;
        end
        c_N4 = c_N4+acos(sigma);
    end
    for k = 2:length(Line3n)-1
        t1 = Line3n(:,k)-Line3n(:,k-1);
        t2 = Line3n(:,k+1)-Line3n(:,k);
        sigma = dot(t1,t2)/norm(t1)/norm(t2);
        if sigma >= 1
            sigma = 1;
        end
        c_N4 = c_N4+acos(sigma);
    end
    for k = 2:length(Line4n)-1
        t1 = Line4n(:,k)-Line4n(:,k-1);
        t2 = Line4n(:,k+1)-Line4n(:,k);
        sigma = dot(t1,t2)/norm(t1)/norm(t2);
        if sigma >= 1
            sigma = 1;
        end
        c_N4 = c_N4+acos(sigma);
    end
    
% Octilinearity Criterion
    c_N5 = 0;
    for k = 2:length(Line1n)
        t1 = Line1n(:,k)-Line1n(:,k-1);
        t2 = [1;0];
        sigma = dot(t1,t2)/norm(t1)/norm(t2);
        if sigma >= 1
            sigma = 1;
        end
        c_N5 = c_N5+abs(sin(4*acos(sigma)));
    end
    for k = 2:length(Line2n)
        t1 = Line2n(:,k)-Line2n(:,k-1);
        t2 = [1;0];
        sigma = dot(t1,t2)/norm(t1)/norm(t2);
        if sigma >= 1
            sigma = 1;
        end
        c_N5 = c_N5+abs(sin(4*acos(sigma)));
    end
    for k = 2:length(Line3n)
        t1 = Line3n(:,k)-Line3n(:,k-1);
        t2 = [1;0];
        sigma = dot(t1,t2)/norm(t1)/norm(t2);
        if sigma >= 1
            sigma = 1;
        end
        c_N5 = c_N5+abs(sin(4*acos(sigma)));
    end
    for k = 2:length(Line4n)
        t1 = Line4n(:,k)-Line4n(:,k-1);
        t2 = [1;0];
        sigma = dot(t1,t2)/norm(t1)/norm(t2);
        if sigma >= 1
            sigma = 1;
        end
        c_N5 = c_N5+abs(sin(4*acos(sigma)));
    end
    
    y = 3*c_N1 + c_N2 + 2*c_N4 +c_N5;
end