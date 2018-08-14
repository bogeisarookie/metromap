% 注意：车站的初始位置并未与网格对齐；Balanced Edge Length Criterion并未使用
clear;close all;clc
dataInput
D = 7.5;
% idealized line section length
x_max = 102;
y_max = 108;
% whole boundary
lb_x = Vx-20;
ub_x = Vx+20;
lb_y = Vy-20;
ub_y = Vy+20;
lb_x(lb_x<0)=0;
ub_x(ub_x>x_max)=x_max;
lb_y(lb_y<0)=0;
ub_y(ub_y>y_max)=y_max;
% limit every variable inside a rectangle of side length 20
objectFunc2 = @(x)objectFunc(x,V,D);
opts = optimoptions('fmincon','Algorithm','interior-point',...
                    'MaxFunctionEvaluations',3000000,...
                    'MaxIterations',10000); 
[x,fval,exitflag,output] = fmincon(objectFunc2,[Vx Vy],...
    [],[],[],[],[lb_x lb_y],[ub_x ub_y],[],opts);
                 
% [x,fval,exitflag,output] = fmincon(objectFunc2,[E1x,E2x,E3x,E4x,E1y,E2y,E3y,E4y],...
%     [],[],[],[],zeros(2*n,1),[x_max*ones(n,1) y_max*ones(n,1)], ... 
%     constraint2,opts);

Vnx = x(1:length(V(1,:)));
Vny = x(length(V(1,:))+1:2*length(V(1,:)));
Line1n = [Vnx(1:16);Vny(1:16)];
Line2n = [Vnx(5) Vnx(17:24) Vnx(12:13) Vnx(25:27);... 
         Vny(5) Vny(17:24) Vny(12:13) Vny(25:27)];
Line3n = [Vnx(28:30) Vnx(7) Vnx(31:32) Vnx(22) Vnx(33:39); ...
         Vny(28:30) Vny(7) Vny(31:32) Vny(22) Vny(33:39)];
Line4n = [Vnx(20) Vnx(40:44);Vny(20) Vny(40:44)];

figure(1)
plot(Line1(1,:),Line1(2,:),'-*',Line2(1,:),Line2(2,:),'--o',...
     Line3(1,:),Line3(2,:),'-.^',Line4(1,:),Line4(2,:),'-.^');
xlim([0,x_max]);
ylim([0,y_max]);
title('Original Position');
figure(2)
plot(Line1n(1,:),Line1n(2,:),'-*',Line2n(1,:),Line2n(2,:),'--o',...
     Line3n(1,:),Line3n(2,:),'-.^',Line4n(1,:),Line4n(2,:),'-.^');
xlim([0,x_max]);
ylim([0,y_max]);
title('Optimized Position');