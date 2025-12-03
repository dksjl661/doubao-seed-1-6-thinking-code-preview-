// 获取DOM元素
const passwordInput = document.getElementById('password');
const strengthDisplay = document.getElementById('strength-display');
const strengthText = document.getElementById('strength-text');

// 密码强度检查函数
function checkPasswordStrength(password) {
    // 空输入处理
    if (!password || password.length === 0) {
        return {
            level: 'empty',
            text: '请输入密码'
        };
    }

    // 检查密码长度
    const length = password.length;
    // 检查是否包含数字
    const hasNumber = /\d/.test(password);
    // 检查是否包含特殊字符
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

    // 强度规则判断
    if (length < 6) {
        return {
            level: 'weak',
            text: '弱'
        };
    } else if (length >= 6 && length < 8 && hasNumber) {
        return {
            level: 'medium',
            text: '中'
        };
    } else if (length >= 8 && hasNumber && hasSpecialChar) {
        return {
            level: 'strong',
            text: '强'
        };
    } else if (length >= 6 && hasNumber) {
        // 长度在6-8之间且包含数字，但不包含特殊字符
        return {
            level: 'medium',
            text: '中'
        };
    } else {
        // 长度大于等于6但不包含数字
        return {
            level: 'weak',
            text: '弱'
        };
    }
}

// 更新强度显示
function updateStrengthDisplay(strength) {
    // 移除所有旧的强度类
    strengthDisplay.classList.remove('weak', 'medium', 'strong', 'empty', 'hidden');

    // 添加新的强度类
    strengthDisplay.classList.add(strength.level);

    // 更新显示文本
    strengthText.textContent = strength.text;
}

// 实时检查密码强度的处理函数
function handlePasswordInput() {
    const password = passwordInput.value;
    const strength = checkPasswordStrength(password);
    updateStrengthDisplay(strength);
}

// 处理输入框失去焦点的事件
function handlePasswordBlur() {
    const password = passwordInput.value;
    const strength = checkPasswordStrength(password);

    // 如果密码强度为强，则隐藏强度显示
    if (strength.level === 'strong') {
        strengthDisplay.classList.add('hidden');
    }
}

// 添加事件监听器
// 使用input事件以支持实时输入和粘贴操作
passwordInput.addEventListener('input', handlePasswordInput);

// 添加blur事件监听器，处理焦点离开的情况
passwordInput.addEventListener('blur', handlePasswordBlur);

// 添加focus事件监听器，当重新获得焦点时显示强度
passwordInput.addEventListener('focus', handlePasswordInput);

// 初始加载时显示空状态
updateStrengthDisplay(checkPasswordStrength(''));