/* ==========================================================================
   INTERACTIVE FOLK PRINT WOODBLOCK COLOR INSPECTOR (CHAPTER 03)
   ========================================================================== */

const DONGHO_DETAILS = {
  diep: {
    title: "MÀU ĐIỆP (TRẮNG ÁNH XÀ CỪ)",
    material: "Vỏ sò điệp biển nghiền mịn + Hồ nếp làng",
    technique: "Quét bằng chổi lá dứa trên giấy dó",
    description: "Lớp nền đặc trưng nhất của tranh Đông Hồ. Người thợ dùng vỏ con sò điệp biển (sò gai) nghiền thành bột mịn, hòa với hồ nếp quánh dẻo, rồi dùng chổi lá dứa quét đều lên từng tờ giấy dó. Những đường quét chổi tạo nên các thớ gân nổi sần sùi và ánh xà cừ trắng lấp lánh khi nghiêng dưới ánh sáng mặt trời.",
    woodblock: "Lớp quét thủ công trước khi in các ván màu"
  },
  den: {
    title: "MÀU ĐEN (THAN LÁ TRE KHÔ)",
    material: "Than lá tre khô ủ kín trong lu sành",
    technique: "Ván in nét đen (nét khắc tinh xảo nhất)",
    description: "Màu đen được người thợ chế tác bằng cách gom lá tre khô sạch vào lu sành, ủ đốt âm ỉ không có oxy. Bột than lá tre siêu mịn, sâu thẳm, không bao giờ ngả xám hay phai nhạt dù trải qua hàng trăm năm. Ván nét đen luôn là ván in cuối cùng để định hình toàn bộ nhân vật, cử chỉ và thần thái của bức tranh.",
    woodblock: "Ván nét đen (in cuối cùng)"
  },
  vang: {
    title: "MÀU VÀNG (HOA HÒE & DÀNH DÀNH)",
    material: "Nụ hoa hòe sao vàng hoặc quả dành dành",
    technique: "Nấu nước cốt cô đặc",
    description: "Màu vàng ấm áp tựa ánh nắng mùa gặt đồng bằng Bắc Bộ được chiết xuất từ nụ hoa hòe phơi khô sao vàng hạ thổ, hoặc quả dành dành giã dập nấu nước. Sắc vàng này dịu nhẹ, thanh khiết, không rực chói như màu hóa học hiện đại và mang tính thẩm mỹ trầm mặc của làng quê Việt.",
    woodblock: "Ván in mảng màu vàng"
  },
  do: {
    title: "MÀU ĐỎ SON (SỎI SON TỰ NHIÊN)",
    material: "Đá sỏi son khai thác từ vùng núi đồi Kinh Bắc",
    technique: "Nghiền cối đá và lắng lọc bột son",
    description: "Sắc đỏ nồng đượm của tranh Đông Hồ không dùng phẩm màu công nghiệp, mà dùng những viên sỏi son tự nhiên khai thác từ lòng đất đồi. Sỏi được nghiền thủ công bằng cối đá, lắng gạn nhiều lần để thu được lớp bột son tinh mịn. Màu đỏ này đại diện cho sự may mắn, sinh sôi và thịnh vượng ngày Tết.",
    woodblock: "Ván in mảng màu đỏ son"
  },
  xanh: {
    title: "MÀU XANH (GỈ ĐỒNG & LÁ CHÀM)",
    material: "Gỉ đồng xanh tự nhiên ngâm dấm hoặc lá chàm",
    technique: "Lắng đọng bột màu tự nhiên",
    description: "Màu xanh trầm mát của lá sen, khóm chuối hay bờ tre được điều chế từ bột gỉ đồng xanh hoặc chiết xuất từ lá chàm ủ lên men. Nhờ nguồn gốc khoáng vật và thực vật này, bức tranh luôn toát lên vẻ đẹp mộc mạc, gần gũi với thiên nhiên và không bị phai màu dưới tác động của thời gian.",
    woodblock: "Ván in mảng màu xanh"
  }
};

export function initFolkInspector() {
  const hotspots = document.querySelectorAll('.folk-hotspot');
  const swatches = document.querySelectorAll('.color-swatch-item');
  const titleEl = document.getElementById('folkDetailTitle');
  const materialEl = document.getElementById('folkDetailMaterial');
  const techniqueEl = document.getElementById('folkDetailTechnique');
  const descEl = document.getElementById('folkDetailDesc');
  const woodblockEl = document.getElementById('folkDetailWoodblock');

  if (!titleEl || !hotspots.length) return;

  function updateDetail(key) {
    const data = DONGHO_DETAILS[key];
    if (!data) return;

    hotspots.forEach(h => {
      h.classList.toggle('active', h.getAttribute('data-color') === key);
    });

    swatches.forEach(s => {
      s.classList.toggle('active', s.getAttribute('data-color') === key);
    });

    titleEl.textContent = data.title;
    if (materialEl) materialEl.textContent = data.material;
    if (techniqueEl) techniqueEl.textContent = data.technique;
    if (descEl) descEl.textContent = data.description;
    if (woodblockEl) woodblockEl.textContent = data.woodblock;
  }

  hotspots.forEach(spot => {
    spot.addEventListener('click', () => {
      const colorKey = spot.getAttribute('data-color');
      updateDetail(colorKey);
    });
  });

  swatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
      const colorKey = swatch.getAttribute('data-color');
      updateDetail(colorKey);
    });
  });

  // Default active
  updateDetail('diep');
}
