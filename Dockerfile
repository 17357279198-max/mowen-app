FROM python:3.11-slim

WORKDIR /app

# 复制后端依赖并安装
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt -i https://mirrors.aliyun.com/pypi/simple/

# 复制后端代码
COPY backend/ ./backend/

# 复制前端构建产物（main.py 中通过 ../frontend/dist 引用）
COPY frontend/dist/ ./frontend/dist/

# 复制 nixpacks 配置
COPY nixpacks.toml .

EXPOSE 8000

# 使用 $PORT 环境变量，兼容 Railway 动态端口分配
CMD cd backend && uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}