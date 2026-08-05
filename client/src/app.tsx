import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Layout from './components/Layout';
import AdminLayout from './components/AdminLayout';
import NotFound from './pages/NotFound/NotFound';

// 前台页面
import HomePage from './pages/HomePage/HomePage';
import AboutPage from './pages/AboutPage/AboutPage';
import RacecarPage from './pages/RacecarPage/RacecarPage';
import CompetitionPage from './pages/CompetitionPage/CompetitionPage';
import MemberPage from './pages/MemberPage/MemberPage';
import SponsorPage from './pages/SponsorPage/SponsorPage';
import RecruitPage from './pages/RecruitPage/RecruitPage';
import ContactPage from './pages/ContactPage/ContactPage';

// 后台页面
import AdminLoginPage from './pages/Admin/AdminLoginPage';
import AdminDashboardPage from './pages/Admin/AdminDashboardPage';
import AdminImagesPage from './pages/Admin/AdminImagesPage';
import AdminContentPage from './pages/Admin/AdminContentPage';
import AdminCompetitionsPage from './pages/Admin/AdminCompetitionsPage';
import AdminMembersPage from './pages/Admin/AdminMembersPage';
import AdminRecruitsPage from './pages/Admin/AdminRecruitsPage';
import AdminSettingsPage from './pages/Admin/AdminSettingsPage';

const RoutesComponent = () => {
  return (
    <Routes>
      {/* 前台页面 - 共享顶部导航+页脚布局 */}
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="racecar" element={<RacecarPage />} />
        <Route path="competition" element={<CompetitionPage />} />
        <Route path="member" element={<MemberPage />} />
        <Route path="sponsor" element={<SponsorPage />} />
        <Route path="recruit" element={<RecruitPage />} />
        <Route path="contact" element={<ContactPage />} />
      </Route>

      {/* 后台登录页 - 独立布局 */}
      <Route path="admin/login" element={<AdminLoginPage />} />

      {/* 后台管理页面 - 共享侧边栏布局 */}
      <Route path="admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboardPage />} />
        <Route path="images" element={<AdminImagesPage />} />
        <Route path="content" element={<AdminContentPage />} />
        <Route path="competitions" element={<AdminCompetitionsPage />} />
        <Route path="members" element={<AdminMembersPage />} />
        <Route path="recruits" element={<AdminRecruitsPage />} />
        <Route path="settings" element={<AdminSettingsPage />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default RoutesComponent;
