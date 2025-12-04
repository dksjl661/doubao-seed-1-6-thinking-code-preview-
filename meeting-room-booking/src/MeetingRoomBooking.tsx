import React, { useState } from 'react';

interface TimeSlot {
  time: string;
  isBooked: boolean;
  isSelected: boolean;
}

const MeetingRoomBooking: React.FC = () => {
  // 初始化一天8小时的时段数据（9:00 - 17:00）
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([
    { time: '9:00', isBooked: false, isSelected: false },
    { time: '10:00', isBooked: false, isSelected: false },
    { time: '11:00', isBooked: false, isSelected: false },
    { time: '12:00', isBooked: false, isSelected: false },
    { time: '13:00', isBooked: false, isSelected: false },
    { time: '14:00', isBooked: false, isSelected: false },
    { time: '15:00', isBooked: false, isSelected: false },
    { time: '16:00', isBooked: false, isSelected: false },
    { time: '17:00', isBooked: false, isSelected: false },
  ]);

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [warningMessage, setWarningMessage] = useState<string>('');

  // 处理时段点击事件
  const handleTimeSlotClick = (index: number) => {
    const slot = timeSlots[index];

    // 已预订的时段不可点击
    if (slot.isBooked) {
      setErrorMessage('该时段已被预订，无法选择');
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }

    // 检查选择限制：只能从第一个未预订的时段开始选择
    const firstAvailableIndex = timeSlots.findIndex(slot => !slot.isBooked);
    if (index < firstAvailableIndex) {
      setErrorMessage('只能从第一个可用时段开始选择');
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }

    // 检查是否有已选中的时段在当前时段之后且不连续
    const selectedSlots = timeSlots.map((slot, i) => i).filter(i => timeSlots[i].isSelected);
    if (selectedSlots.length > 0) {
      const minSelected = Math.min(...selectedSlots);
      const maxSelected = Math.max(...selectedSlots);

      // 如果当前时段不在已选中时段的连续范围内，则清除之前的选择
      if (index < minSelected - 1 || index > maxSelected + 1) {
        const newTimeSlots = timeSlots.map(slot => ({ ...slot, isSelected: false }));
        newTimeSlots[index].isSelected = !newTimeSlots[index].isSelected;
        setTimeSlots(newTimeSlots);
        setWarningMessage('');
        return;
      }
    }

    // 切换当前时段的选择状态
    const newTimeSlots = [...timeSlots];
    newTimeSlots[index].isSelected = !newTimeSlots[index].isSelected;
    setTimeSlots(newTimeSlots);
    setWarningMessage('');
  };

  // 处理预订按钮点击事件
  const handleBookNow = () => {
    const selectedSlots = timeSlots.map((slot, i) => i).filter(i => timeSlots[i].isSelected);

    if (selectedSlots.length === 0) {
      setErrorMessage('请先选择要预订的时段');
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }

    // 检查连续性约束
    for (let i = 1; i < selectedSlots.length; i++) {
      if (selectedSlots[i] - selectedSlots[i - 1] !== 1) {
        setErrorMessage('预订时段必须连续');
        setTimeout(() => setErrorMessage(''), 3000);
        return;
      }
    }

    // 检查最大时长3小时限制
    if (selectedSlots.length > 3) {
      setWarningMessage('单次预订时长超过3小时，确定要继续吗？');
      return;
    }

    // 确认预订并标记为已预订
    const newTimeSlots = timeSlots.map((slot, i) =>
      selectedSlots.includes(i) ? { ...slot, isBooked: true, isSelected: false } : slot
    );
    setTimeSlots(newTimeSlots);
    setErrorMessage('');
    setWarningMessage('');

    alert(`成功预订 ${selectedSlots.length} 小时会议室！`);
  };

  // 确认超过3小时的预订
  const handleConfirmOverTime = () => {
    const selectedSlots = timeSlots.map((slot, i) => i).filter(i => timeSlots[i].isSelected);

    const newTimeSlots = timeSlots.map((slot, i) =>
      selectedSlots.includes(i) ? { ...slot, isBooked: true, isSelected: false } : slot
    );
    setTimeSlots(newTimeSlots);
    setErrorMessage('');
    setWarningMessage('');

    alert(`成功预订 ${selectedSlots.length} 小时会议室！`);
  };

  // 取消超过3小时的预订
  const handleCancelOverTime = () => {
    setWarningMessage('');
  };

  return (
    <div style={{ maxWidth: '400px', margin: '20px auto', padding: '0 20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>会议室预订</h2>

      {/* 错误和警告信息 */}
      {errorMessage && (
        <div style={{
          backgroundColor: '#f8d7da',
          color: '#721c24',
          padding: '10px',
          borderRadius: '4px',
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          {errorMessage}
        </div>
      )}

      {warningMessage && (
        <div style={{
          backgroundColor: '#fff3cd',
          color: '#856404',
          padding: '10px',
          borderRadius: '4px',
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          {warningMessage}
          <div style={{ marginTop: '10px' }}>
            <button
              onClick={handleConfirmOverTime}
              style={{
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                padding: '5px 10px',
                borderRadius: '4px',
                marginRight: '10px',
                cursor: 'pointer'
              }}
            >
              确定
            </button>
            <button
              onClick={handleCancelOverTime}
              style={{
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                padding: '5px 10px',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              取消
            </button>
          </div>
        </div>
      )}

      {/* 时间段列表 */}
      <div style={{ marginBottom: '20px' }}>
        {timeSlots.map((slot, index) => (
          <div
            key={index}
            onClick={() => handleTimeSlotClick(index)}
            style={{
              backgroundColor: slot.isBooked ? '#dc3545' : slot.isSelected ? '#28a745' : '#e9ecef',
              color: slot.isBooked || slot.isSelected ? 'white' : '#333',
              padding: '15px',
              marginBottom: '10px',
              borderRadius: '4px',
              cursor: slot.isBooked ? 'not-allowed' : 'pointer',
              textAlign: 'center',
              fontSize: '16px',
              fontWeight: 'bold',
              transition: 'background-color 0.3s ease'
            }}
          >
            {slot.time}
          </div>
        ))}
      </div>

      {/* 预订按钮 */}
      <button
        onClick={handleBookNow}
        style={{
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          padding: '12px 24px',
          borderRadius: '4px',
          fontSize: '16px',
          cursor: 'pointer',
          width: '100%',
          transition: 'background-color 0.3s ease'
        }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#007bff'}
      >
        Book Now
      </button>

      {/* 说明文字 */}
      <div style={{
        marginTop: '20px',
        fontSize: '12px',
        color: '#666',
        textAlign: 'center'
      }}>
        <p>• 红色：已预订时段，不可选择</p>
        <p>• 绿色：已选中时段，准备预订</p>
        <p>• 灰色：可选择时段</p>
      </div>
    </div>
  );
};

export default MeetingRoomBooking;