
<header class="header">
  <div class="header-content">
    <h1>miniCRM</h1>

    <nav class="nav">
      <a href="#" class="nav-link active">Клиенты</a>
      <a href="#" class="nav-link">Сделки</a>
      <a href="#" class="nav-link">Задачи</a>
      <a href="#" class="nav-link">Аналитика</a>
    </nav>

    <div class="user-menu">
      <span class="user-name">Администратор</span>
      <div class="user-avatar">A</div>
    </div>
  </div>
</header>

<style>
  .header {
    background: white;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    position: sticky;
    top: 0;
    z-index: 10;
  }
  
  .header-content {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 24px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .header h1 {
    font-size: 20px;
    font-weight: 600;
    color: #2c3e50;
    letter-spacing: -0.3px;
  }
  
  .nav {
    display: flex;
    gap: 24px;
    margin-left: 48px;
  }
  
  .nav-link {
    color: #666;
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
    padding: 4px 0;
    border-bottom: 2px solid transparent;
    transition: all 0.2s;
  }
  
  .nav-link:hover {
    color: #333;
  }
  
  .nav-link.active {
    color: #007bff;
    border-bottom-color: #007bff;
  }
  
  .user-menu {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-left: auto;
  }
  
  .user-name {
    font-size: 14px;
    font-weight: 500;
    color: #333;
  }
  
  .user-avatar {
    width: 36px;
    height: 36px;
    background: #007bff;
    color: white;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 16px;
  }
</style>
