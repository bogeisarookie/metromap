% 注锟解：锟斤拷站锟侥筹拷始位锟矫诧拷未锟斤拷锟斤拷锟斤拷锟斤拷耄籅alanced Edge Length Criterion锟斤拷未使锟斤拷
clear;close all;clc
dataInput
D = 80;
% idealized line section length
%闃挎槦鐨勫垵濮嬫暟鎹�
% x_max = 102;
% y_max = 108;
x_max=3000;
y_max=3000;
% whole boundary
lb_x = Vx-80;
ub_x = Vx+80;
lb_y = Vy-80;
ub_y = Vy+80;
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
%闃挎槦鍘熷鏁版嵁
% Line1n = [Vnx(1:16);Vny(1:16)];
% Line2n = [Vnx(5) Vnx(17:24) Vnx(12:13) Vnx(25:27);... 
%          Vny(5) Vny(17:24) Vny(12:13) Vny(25:27)];
% Line3n = [Vnx(28:30) Vnx(7) Vnx(31:32) Vnx(22) Vnx(33:39); ...
%          Vny(28:30) Vny(7) Vny(31:32) Vny(22) Vny(33:39)];
% Line4n = [Vnx(20) Vnx(40:44);Vny(20) Vny(40:44)];
Line1n=[Vnx(203) Vnx(234) Vnx(128) Vnx(118) Vnx(192) Vnx(13) Vnx(196) Vnx(255) Vnx(73) Vnx(18) Vnx(183) Vnx(91) Vnx(179) Vnx(251) Vnx(67) Vnx(189) Vnx(294) Vnx(259) Vnx(191) Vnx(237) Vnx(166) Vnx(56) Vnx(230) Vnx(83) Vnx(55) Vnx(5) Vnx(274) Vnx(51);Vny(203) Vny(234) Vny(128) Vny(118) Vny(192) Vny(13) Vny(196) Vny(255) Vny(73) Vny(18) Vny(183) Vny(91) Vny(179) Vny(251) Vny(67) Vny(189) Vny(294) Vny(259) Vny(191) Vny(237) Vny(166) Vny(56) Vny(230) Vny(83) Vny(55) Vny(5) Vny(274) Vny(51)];
Line2n=[Vnx(169) Vnx(66) Vnx(278) Vnx(134) Vnx(23) Vnx(87) Vnx(24) Vnx(224) Vnx(60) Vnx(112) Vnx(283) Vnx(142) Vnx(208) Vnx(190) Vnx(207) Vnx(39) Vnx(150) Vnx(159) Vnx(179) Vnx(160) Vnx(120) Vnx(104) Vnx(295) Vnx(146) Vnx(235) Vnx(9) Vnx(222) Vnx(78) Vnx(79) Vnx(256);Vny(169) Vny(66) Vny(278) Vny(134) Vny(23) Vny(87) Vny(24) Vny(224) Vny(60) Vny(112) Vny(283) Vny(142) Vny(208) Vny(190) Vny(207) Vny(39) Vny(150) Vny(159) Vny(179) Vny(160) Vny(120) Vny(104) Vny(295) Vny(146) Vny(235) Vny(9) Vny(222) Vny(78) Vny(79) Vny(256)];
Line3n=[Vnx(192) Vnx(204) Vnx(138) Vnx(15) Vnx(268) Vnx(80) Vnx(257) Vnx(295) Vnx(115) Vnx(12) Vnx(291) Vnx(296) Vnx(189) Vnx(6) Vnx(38) Vnx(75) Vnx(22) Vnx(27) Vnx(106) Vnx(270) Vnx(284) Vnx(221) Vnx(282) Vnx(220) Vnx(211) Vnx(7) Vnx(273) Vnx(229) Vnx(107);Vny(192) Vny(204) Vny(138) Vny(15) Vny(268) Vny(80) Vny(257) Vny(295) Vny(115) Vny(12) Vny(291) Vny(296) Vny(189) Vny(6) Vny(38) Vny(75) Vny(22) Vny(27) Vny(106) Vny(270) Vny(284) Vny(221) Vny(282) Vny(220) Vny(211) Vny(7) Vny(273) Vny(229) Vny(107)];
Line4n=[Vnx(268) Vnx(196) Vnx(195) Vnx(37) Vnx(32) Vnx(148) Vnx(244) Vnx(161) Vnx(225) Vnx(125) Vnx(167) Vnx(207) Vnx(168) Vnx(263) Vnx(31) Vnx(131) Vnx(65) Vnx(6) Vnx(189) Vnx(296) Vnx(291) Vnx(12) Vnx(115) Vnx(295) Vnx(257) Vnx(80);Vny(268) Vny(196) Vny(195) Vny(37) Vny(32) Vny(148) Vny(244) Vny(161) Vny(225) Vny(125) Vny(167) Vny(207) Vny(168) Vny(263) Vny(31) Vny(131) Vny(65) Vny(6) Vny(189) Vny(296) Vny(291) Vny(12) Vny(115) Vny(295) Vny(257) Vny(80)];
Line5n=[Vnx(203) Vnx(25) Vnx(271) Vnx(300) Vnx(8) Vnx(100) Vnx(40) Vnx(113) Vnx(86) Vnx(236) Vnx(157);Vny(203) Vny(25) Vny(271) Vny(300) Vny(8) Vny(100) Vny(40) Vny(113) Vny(86) Vny(236) Vny(157)];
Line6n=[Vnx(52) Vnx(232) Vnx(68) Vnx(233) Vnx(299) Vnx(240) Vnx(42) Vnx(122) Vnx(239) Vnx(11) Vnx(114) Vnx(280) Vnx(34) Vnx(10) Vnx(156) Vnx(277) Vnx(207) Vnx(167) Vnx(125) Vnx(188) Vnx(132) Vnx(53) Vnx(45) Vnx(54) Vnx(88) Vnx(200) Vnx(133) Vnx(41);Vny(52) Vny(232) Vny(68) Vny(233) Vny(299) Vny(240) Vny(42) Vny(122) Vny(239) Vny(11) Vny(114) Vny(280) Vny(34) Vny(10) Vny(156) Vny(277) Vny(207) Vny(167) Vny(125) Vny(188) Vny(132) Vny(53) Vny(45) Vny(54) Vny(88) Vny(200) Vny(133) Vny(41)];
Line7n=[Vnx(84) Vnx(142) Vnx(47) Vnx(119) Vnx(261) Vnx(53) Vnx(281) Vnx(265) Vnx(285) Vnx(82) Vnx(140) Vnx(37) Vnx(288) Vnx(18) Vnx(120) Vnx(17) Vnx(286) Vnx(291) Vnx(124) Vnx(248) Vnx(30) Vnx(253) Vnx(28) Vnx(19) Vnx(185) Vnx(158) Vnx(186) Vnx(174) Vnx(57) Vnx(136) Vnx(165) Vnx(151) Vnx(155);Vny(84) Vny(142) Vny(47) Vny(119) Vny(261) Vny(53) Vny(281) Vny(265) Vny(285) Vny(82) Vny(140) Vny(37) Vny(288) Vny(18) Vny(120) Vny(17) Vny(286) Vny(291) Vny(124) Vny(248) Vny(30) Vny(253) Vny(28) Vny(19) Vny(185) Vny(158) Vny(186) Vny(174) Vny(57) Vny(136) Vny(165) Vny(151) Vny(155)];
Line8n=[Vnx(20) Vnx(129) Vnx(108) Vnx(170) Vnx(147) Vnx(135) Vnx(41) Vnx(264) Vnx(21) Vnx(265) Vnx(293) Vnx(244) Vnx(149) Vnx(126) Vnx(33) Vnx(179) Vnx(177) Vnx(297) Vnx(243) Vnx(75) Vnx(178) Vnx(214) Vnx(3) Vnx(103) Vnx(93) Vnx(258) Vnx(92) Vnx(245) Vnx(163) Vnx(209);Vny(20) Vny(129) Vny(108) Vny(170) Vny(147) Vny(135) Vny(41) Vny(264) Vny(21) Vny(265) Vny(293) Vny(244) Vny(149) Vny(126) Vny(33) Vny(179) Vny(177) Vny(297) Vny(243) Vny(75) Vny(178) Vny(214) Vny(3) Vny(103) Vny(93) Vny(258) Vny(92) Vny(245) Vny(163) Vny(209)];
Line9n=[Vnx(262) Vnx(207) Vnx(184) Vnx(246) Vnx(149) Vnx(153) Vnx(26) Vnx(99) Vnx(288) Vnx(255) Vnx(268) Vnx(62) Vnx(14) Vnx(71) Vnx(252) Vnx(172) Vnx(292) Vnx(121) Vnx(215) Vnx(201) Vnx(46) Vnx(216) Vnx(219) Vnx(218) Vnx(303) Vnx(217);Vny(262) Vny(207) Vny(184) Vny(246) Vny(149) Vny(153) Vny(26) Vny(99) Vny(288) Vny(255) Vny(268) Vny(62) Vny(14) Vny(71) Vny(252) Vny(172) Vny(292) Vny(121) Vny(215) Vny(201) Vny(46) Vny(216) Vny(219) Vny(218) Vny(303) Vny(217)];
Line10n=[Vnx(249) Vnx(269) Vnx(182) Vnx(105) Vnx(238) Vnx(64) Vnx(231) Vnx(214) Vnx(272) Vnx(65) Vnx(213) Vnx(228) Vnx(159) Vnx(276) Vnx(126) Vnx(250) Vnx(183) Vnx(197) Vnx(109) Vnx(80) Vnx(223) Vnx(267) Vnx(212) Vnx(141) Vnx(187) Vnx(77) Vnx(78) Vnx(79) Vnx(137) Vnx(301) Vnx(70);Vny(249) Vny(269) Vny(182) Vny(105) Vny(238) Vny(64) Vny(231) Vny(214) Vny(272) Vny(65) Vny(213) Vny(228) Vny(159) Vny(276) Vny(126) Vny(250) Vny(183) Vny(197) Vny(109) Vny(80) Vny(223) Vny(267) Vny(212) Vny(141) Vny(187) Vny(77) Vny(78) Vny(79) Vny(137) Vny(301) Vny(70)];
Line12n=[Vnx(110) Vnx(202) Vnx(111) Vnx(260) Vnx(122) Vnx(44) Vnx(50) Vnx(1) Vnx(144) Vnx(164) Vnx(102) Vnx(31) Vnx(227) Vnx(63) Vnx(228) Vnx(177) Vnx(67) Vnx(160) Vnx(183) Vnx(99) Vnx(32) Vnx(140) Vnx(139) Vnx(138) Vnx(13) Vnx(61) Vnx(74) Vnx(76) Vnx(43) Vnx(58) Vnx(81) Vnx(173) ;Vny(110) Vny(202) Vny(111) Vny(260) Vny(122) Vny(44) Vny(50) Vny(1) Vny(144) Vny(164) Vny(102) Vny(31) Vny(227) Vny(63) Vny(228) Vny(177) Vny(67) Vny(160) Vny(183) Vny(99) Vny(32) Vny(140) Vny(139) Vny(138) Vny(13) Vny(61) Vny(74) Vny(76) Vny(43) Vny(58) Vny(81) Vny(173)];
Line13n=[Vnx(117) Vnx(116) Vnx(48) Vnx(176) Vnx(289) Vnx(29) Vnx(115) Vnx(145) Vnx(241) Vnx(286) Vnx(101) Vnx(67) Vnx(302) Vnx(160) Vnx(90) Vnx(250) Vnx(153) Vnx(206) Vnx(205) ;Vny(117) Vny(116) Vny(48) Vny(176) Vny(289) Vny(29) Vny(115) Vny(145) Vny(241) Vny(286) Vny(101) Vny(67) Vny(302) Vny(160) Vny(90) Vny(250) Vny(153) Vny(206) Vny(205)];
Line16n=[Vnx(35) Vnx(130) Vnx(210) Vnx(95) Vnx(94) Vnx(266) Vnx(247) Vnx(69) Vnx(72) Vnx(298) Vnx(152) Vnx(89) Vnx(142);Vny(35) Vny(130) Vny(210) Vny(95) Vny(94) Vny(266) Vny(247) Vny(69) Vny(72) Vny(298) Vny(152) Vny(89) Vny(142)];
figure(1)
% plot(Line1(1,:),Line1(2,:),'-*',Line2(1,:),Line2(2,:),'--o',...
%      Line3(1,:),Line3(2,:),'-.^',Line4(1,:),Line4(2,:),'-.^');
plot(Line1(1,:),Line1(2,:),'-*',Line2(1,:),Line2(2,:),'--o',...
     Line3(1,:),Line3(2,:),'-.^',Line4(1,:),Line4(2,:),'-.^',...
     Line5(1,:),Line5(2,:),'--o',Line6(1,:),Line6(2,:),'--o',...
     Line7(1,:),Line7(2,:),'--o',Line8(1,:),Line8(2,:),'--o',...
     Line9(1,:),Line9(2,:),'--o',Line10(1,:),Line10(2,:),'--o',...
     Line12(1,:),Line12(2,:),'--o',Line13(1,:),Line13(2,:),'--o',...
     Line16(1,:),Line16(2,:),'--o');                   
xlim([0,x_max]);
ylim([0,y_max]);
title('Original Position');
figure(2)
% plot(Line1n(1,:),Line1n(2,:),'-*',Line2n(1,:),Line2n(2,:),'--o',...
%      Line3n(1,:),Line3n(2,:),'-.^',Line4n(1,:),Line4n(2,:),'-.^');
plot(Line1n(1,:),Line1n(2,:),'-*',Line2n(1,:),Line2n(2,:),'--o',...
     Line3n(1,:),Line3n(2,:),'-.^',Line4n(1,:),Line4n(2,:),'-.^',...
     Line5n(1,:),Line5n(2,:),'--o',Line6n(1,:),Line6n(2,:),'--o',...
     Line7n(1,:),Line7n(2,:),'--o',Line8n(1,:),Line8n(2,:),'--o',...
     Line9n(1,:),Line9n(2,:),'--o',Line10n(1,:),Line10n(2,:),'--o',...
    Line12n(1,:),Line12n(2,:),'--o',Line13n(1,:),Line13n(2,:),'--o',...
     Line16n(1,:),Line16n(2,:),'--o');   
xlim([0,x_max]);
ylim([0,y_max]);
title('Optimized Position');