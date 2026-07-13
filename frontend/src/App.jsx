// 墨问 App 主组件 —— 管理页面状态与导航
import { useState, useCallback } from 'react'
import HomePage from './pages/HomePage'
import ChatPage from './pages/ChatPage'
import FavoritesPage from './pages/FavoritesPage'
import AboutPage from './pages/AboutPage'
import CommunityPage from './pages/CommunityPage'
import AuthPage from './pages/AuthPage'
import BottomNav from './components/BottomNav'

export default function App() {
  // 当前页面：home | chat | favorites | community | auth | about | search
  const [page, setPage] = useState('home')
  // 对话页所需参数
  const [chatParams, setChatParams] = useState({ question: '', roleId: 'zhuangzi' })
  // 搜索关键词
  const [searchKeyword, setSearchKeyword] = useState('')

  // 从首页/场景发起提问 → 跳转对话页
  const handleAsk = useCallback((question, roleId) => {
    setChatParams({ question, roleId })
    setPage('chat')
  }, [])

  // 从收藏夹重新打开对话
  const handleOpenChat = useCallback((question, roleId) => {
    setChatParams({ question, roleId })
    setPage('chat')
  }, [])

  // 底部导航切换
  const handleNavChange = useCallback((key) => {
    if (key === 'chat') {
      setPage('chat')
    } else {
      setPage(key)
    }
  }, [])

  // 返回首页
  const handleBack = useCallback(() => {
    setPage('home')
  }, [])

  // 跳转到社区
  const handleGoCommunity = useCallback(() => {
    setPage('community')
  }, [])

  // 跳转到搜索
  const handleGoSearch = useCallback((keyword) => {
    // 暂时跳转到首页，后续可以添加搜索页
    setSearchKeyword(keyword || '')
    setPage('home')
  }, [])

  // 跳转到登录/我的
  const handleGoAuth = useCallback(() => {
    setPage('auth')
  }, [])

  // 对话页不显示底部导航（有自己的输入框）
  const showBottomNav = page !== 'chat'

  return (
    <div className="min-h-screen bg-ink-bg text-ink-dark">
      {page === 'home' && (
        <HomePage
          onAsk={handleAsk}
          onGoFavorites={() => setPage('favorites')}
          onGoCommunity={handleGoCommunity}
          onGoSearch={handleGoSearch}
          onGoAuth={handleGoAuth}
        />
      )}
      {page === 'chat' && (
        <ChatPage
          initialQuestion={chatParams.question}
          initialRoleId={chatParams.roleId}
          onBack={handleBack}
        />
      )}
      {page === 'favorites' && (
        <FavoritesPage onBack={handleBack} onOpenChat={handleOpenChat} />
      )}
      {page === 'community' && (
        <CommunityPage onBack={handleBack} onOpenChat={handleOpenChat} />
      )}
      {page === 'auth' && (
        <AuthPage onBack={handleBack} />
      )}
      {page === 'about' && <AboutPage onBack={handleBack} />}

      {showBottomNav && <BottomNav active={page} onChange={handleNavChange} />}
    </div>
  )
}